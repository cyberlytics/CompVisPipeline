from app.Pipeline.Steps.baseStep import BaseStep


class RandomWalker(BaseStep):
    def __call__(self, img, parameters):
        # TODO: implement random walker segmentation.
        pass

    def describe(self):
        return {
            "title": "Random Walker Segmentation",
            "info": "Segment image using the random walker alogrithm.",
            "params": [],
        }
