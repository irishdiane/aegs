# word2vec_singleton.py
import os
import gensim

class Word2VecSingleton:
    _instance = None
    model = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = Word2VecSingleton()
            cls._instance.load_model()
        return cls._instance

    def load_model(self):
        # Try both .kv and .npykv (gensim 4.3+)
        kv_path = os.path.join("data", "word2vec", "word2vec_prepared.kv")
        npykv_path = os.path.join("data", "word2vec", "word2vec_prepared.kv.vectors.npy")

        if os.path.exists(kv_path) or os.path.exists(npykv_path):
            print(f"Loading preprocessed Word2Vec model from: {kv_path}")
            self.model = gensim.models.KeyedVectors.load(kv_path)
        else:
            raise FileNotFoundError(f"Neither {kv_path} nor its .npy companion found. Please ensure the model is prepared.")

    def get_model(self):
        return self.model

def get_word2vec_model():
    return Word2VecSingleton.get_instance().get_model()
