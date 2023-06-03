from uuid import uuid4
from app.Pipeline.Steps.baseStep import ImageProcessingError
from app.Pipeline.Steps.bilateralFilter import BilateralFilter
from app.Pipeline.Steps.gaussianBlur import GaussianBlur
from app.Pipeline.Steps.anisotropicDiffusion import AnisotropicDiffusion
from app.Pipeline.Steps.averagingFilter import AveragingFilter
from app.Pipeline.Steps.bottomHat import BottomHat
from app.Pipeline.Steps.cannyEdge import CannyEdge
from app.Pipeline.Steps.clahe import CLAHE
from app.Pipeline.Steps.closing import Closing
from app.Pipeline.Steps.connectedComponents import ConnectedComponents
from app.Pipeline.Steps.convertColor import ConvertColor
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

from app.connections.aws_s3 import AWSError, S3Manager

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
    ConvertColor(),
    Crop(),
    Dilation(),
    Erosion(),
    Flip(),
    GaussianNoise(),
    GammaTransform(),
    Watershed(),
    PoissonNoise(),
    HarrisCorner(),
    HistogramEqualization(),
    HoughCircle(),
    HoleFilling(),
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
    Sobel(),
    SaltAndPepperNoise(),
    Rotate(),
    HoughLines()
]


class PipelineError(Exception):
    def __init__(self, message):
        self.message = message


class Pipeline:
    def __init__(self, image, steps, s3Manager=None, functionList=FUNCTION_LIST):
        self.image = image
        self.steps = steps
        self.s3Manager = s3Manager or S3Manager()
        self.functionList = functionList

    def start(self):
        try:
            lastImage = self.s3Manager.getImageFromS3(self.image)
        except AWSError as e:
            raise PipelineError(message="failed to load image from s3 bucket")
        allResults = [self.image]
        for step in self.steps:
            try:
                lastImage = self.functionList[step.id](lastImage, step.params)
            except ImageProcessingError as e:
                raise PipelineError(message=e.message)
            id = str(uuid4())
            try:
                self.s3Manager.pushImageToS3(id, lastImage)
            except AWSError:
                raise PipelineError(message="failed to save image to s3 bucket")
            allResults.append(id)
        return allResults
