from core.models import User
from django.test.client import Client
from django.test.testcases import TestCase
from core.tests import fixtures
import json

PENSOLOGO = 'Penso, logo existo!'

PRIMEIRALEI = 'A tendência dos corpos, quando nehuma força é exercida sobre eles, '\
              'é permanecer em seu estado natural, ou seja, repouso ou movimento retilíneo e uniforme.'

GRAVITACAO = 'Dois corpos no espaço se atraem com um força inversamente proporcional ao quadrado da distância entre eles.'

INSANIDADE = 'Insanidade é continuar fazendo sempre a mesma coisa e esperar resultados diferentes'

class TestTweetsApi(TestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures.usuarios_cientistas()

    def test_tweets_api(self):
        newton, einstein, descartes, anon = Client(), Client(), Client(), Client()
        newton.force_login(User.objects.get(username='@newton'))
        einstein.force_login(User.objects.get(username='@einstein'))
        descartes.force_login(User.objects.get(username='@descartes'))

        self._follow(newton, '@descartes')
        self._follow(einstein, '@descartes')
        self._follow(einstein, '@newton')
        self._follow(newton, '@einstein')

        self._unfollow(newton, '@einstein')

        self._tweet(descartes, PENSOLOGO)
        self._tweet(newton, PRIMEIRALEI)
        self._tweet(einstein, GRAVITACAO)
        self._tweet(einstein, 'E = mc2')
        self._tweet(einstein, INSANIDADE)

        self._assert_tweets_home(descartes, [])
        self._assert_tweets_home(newton, [PENSOLOGO])
        self._assert_tweets_home(einstein, [ GRAVITACAO, PRIMEIRALEI, PENSOLOGO])

    def _follow(self, client, username):
        r = client.post('/api/follow', {'username': username})
        self.assertEquals(200, r.status_code)
        data = json.loads(r.content.decode('utf-8'))
        self.assertIsNotNone(data)

    def _unfollow(self, client, username):
        r = client.post('/api/unfollow', {'username': username})
        self.assertEquals(200, r.status_code)
        data = json.loads(r.content.decode('utf-8'))
        self.assertIsNotNone(data)

    def _tweet(self, client, text):
        r = client.post('/api/tweet', {'text': text})
        self.assertEquals(200, r.status_code)
        data = json.loads(r.content.decode('utf-8'))
        self.assertIsNotNone(data)

    def _assert_tweets_home(self, client, expectedtweets):
        r = client.get('/api/list_tweets')
        self.assertEquals(200, r.status_code)
        tweets = json.loads(r.content.decode('utf-8'))
        actualtweet_texts = [t['text'] for t in tweets]
        self.assertEquals(actualtweet_texts, expectedtweets)