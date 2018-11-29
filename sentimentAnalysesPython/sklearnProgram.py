# https://pythonprogramming.net/sklearn-scikit-learn-nltk-tutorial/
from sklearn.linear_model import LogisticRegression
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.model_selection import train_test_split

from nltk.classify import SklearnClassifier

data = pd.read_csv('reviews.csv')

print(data[['text','sentiment']])
data = data[['text','sentiment']]

training_set, testing_set = train_test_split(data,test_size = 0.1)

LogisticRegression_classifier = SklearnClassifier(LogisticRegression())
LogisticRegression_classifier.train(training_set)
print("LogisticRegression_classifier accuracy percent:", (nltk.classify.accuracy(LogisticRegression_classifier, testing_set))*100)