import os
import gensim
import requests
import zipfile
import shutil

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
        bin_path = "flask-server/data/word2vec/GoogleNews-vectors-negative300.bin"
        kv_path = "flask-server/data/word2vec/word2vec_prepared.kv"
        zip_path = "flask-server/data/word2vec/GoogleNews-vectors-negative300.bin.gz"
        download_url = "https://drive.google.com/uc?export=download&id=1UYR9nhlMx37qXqZ88bff7yJrmsVUY6yi"

        os.makedirs(os.path.dirname(bin_path), exist_ok=True)

        # Download if not present
        if not os.path.exists(bin_path):
            print("Downloading Word2Vec model zip...")
            with requests.get(download_url, stream=True) as r:
                r.raise_for_status()
                with open(zip_path, 'wb') as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        f.write(chunk)
            print("Download complete.")

            print("Extracting gzipped file...")
            # If it's a .gz file, we can use gzip to decompress it
            with open(bin_path, 'wb') as f_out:
                with open(zip_path, 'rb') as f_in:
                    shutil.copyfileobj(f_in, f_out)
            print("Extraction complete.")
            
            # Clean up the zip file
            os.remove(zip_path)

        # Load model
        if os.path.exists(kv_path):
            print(f"Loading optimized model from: {kv_path}")
            self.model = gensim.models.KeyedVectors.load(kv_path)
        elif os.path.exists(bin_path):
            print(f"Loading raw model from: {bin_path}")
            self.model = gensim.models.KeyedVectors.load_word2vec_format(bin_path, binary=True, limit=1000000)
            self.model.fill_norms()
            self.model.save(kv_path)
            print(f"Saved optimized model to: {kv_path}")
        else:
            print(f"Model file not found at {bin_path}")
            self.model = None

    def get_model(self):
        return self.model

def get_word2vec_model():
    return Word2VecSingleton.get_instance().get_model()