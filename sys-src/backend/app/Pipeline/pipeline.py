from uuid import uuid4
from app.Pipeline.Steps.bilateralFilter import BilateralFilter
from app.Pipeline.Steps.convertType import ConvertType
from app.Pipeline.Steps.gaussianBlur import GaussianBlur
from app.Pipeline.Steps.anisotropicDiffusion import AnisotropicDiffusion
from app.Pipeline.Steps.averagingFilter import AveragingFilter
from app.Pipeline.Steps.bottomHat import BottomHat
from app.Pipeline.Steps.cannyEdge import CannyEdge
from app.Pipeline.Steps.clahe import CLAHE
from app.Pipeline.Steps.closing import Closing
from app.Pipeline.Steps.connectedComponents import ConnectedComponents
from app.Pipeline.Steps.convertGray import ConvertGray
from app.Pipeline.Steps.crop import Crop
from app.Pipeline.Steps.dilation import Dilation
from app.Pipeline.Steps.erosion import Erosion
from app.Pipeline.Steps.flip import Flip
from app.Pipeline.Steps.gaussianNoise import GaussianNoise
from app.Pipeline.Steps.gammaTransform import GammaTransform
from app.Pipeline.Steps.watershed import Watershed
from app.Pipeline.Steps.poissonNoise import PoissonNoise
from app.Pipeline.Steps.harrisCorner import HarrisCorner
from app.Pipeline.Steps.histogramEqualization import HistogramEqualization
from app.Pipeline.Steps.houghCircle import HoughCircle
from app.Pipeline.Steps.holeFilling import HoleFilling
from app.Pipeline.Steps.logTransform import LogTransform
from app.Pipeline.Steps.medianFilter import MedianFilter
from app.Pipeline.Steps.nonLocalMeansFilter import NonLocalMeansFilter
from app.Pipeline.Steps.opening import Opening
from app.Pipeline.Steps.randomWalker import RandomWalker
from app.Pipeline.Steps.topHat import TopHat
from app.Pipeline.Steps.thresholdOtsu import ThresholdOtsu
from app.Pipeline.Steps.threshold import Thershold
from app.Pipeline.Steps.speckleNoise import SpeckleNoise
from app.Pipeline.Steps.thresholdMultiOtsu import ThresholdMultiOtsu
from app.Pipeline.Steps.sobel import Sobel
from app.Pipeline.Steps.saltAndPepperNoise import SaltAndPepperNoise
from app.Pipeline.Steps.rotate import Rotate
from app.Pipeline.Steps.houghLines import HoughLines

from app.connections.aws_s3 import S3Manager
from app.metadata import Metadata

FUNCTION_LIST = [
    BilateralFilter(),
    GaussianBlur(),
    AnisotropicDiffusion(),
    AveragingFilter(),
    BottomHat(),
    CannyEdge(),
    CLAHE(),
    Closing(),
    ConnectedComponents(),
    ConvertGray(),
    ConvertType(),
    Crop(),
    Dilation(),
    Erosion(),
    Flip(),
    GaussianNoise(),
    GammaTransform(),
    Watershed(),
    PoissonNoise(),
    #TODO: HarrisCorner(),
    HistogramEqualization(),
    #TODO: HoughCircle(),
    #TODO: HoleFilling(),
    LogTransform(),
    MedianFilter(),
    NonLocalMeansFilter(),
    Opening(),
    RandomWalker(),
    TopHat(),
    ThresholdOtsu(),
    Thershold(),
    SpeckleNoise(),
    ThresholdMultiOtsu(),
    #TODO: Sobel(),
    SaltAndPepperNoise(),
    Rotate(),
    #TODO: HoughLines(),
]


class Pipeline:
    def __init__(
        self,
        image,
        steps,
        s3Manager=None,
        metaDataManager=None,
        functionList=FUNCTION_LIST,
    ):
        self.image = image
        self.steps = steps
        self.s3Manager = s3Manager or S3Manager()
        self.metaDataManager = metaDataManager or Metadata()
        self.functionList = functionList

    def start(self):
        lastImage = self.s3Manager.getImageFromS3(self.image)
        metaData = self.metaDataManager.getMetadata(lastImage)
        allResults = [
            {
                "imageId": self.image,
                "histId": metaData[0],
                "height": metaData[1],
                "width": metaData[2],
                "channels": metaData[3],
            }
        ]
        for step in self.steps:
            lastImage = self.functionList[step.id](lastImage, step.params)
            metaData = self.metaDataManager.getMetadata(lastImage)
            id = str(uuid4()) + ".jpeg"
            self.s3Manager.pushImageToS3(id, lastImage)
            allResults.append(
                {
                    "imageId": id,
                    "histId": metaData[0],
                    "height": metaData[1],
                    "width": metaData[2],
                    "channels": metaData[3],
                }
            )
        return allResults
