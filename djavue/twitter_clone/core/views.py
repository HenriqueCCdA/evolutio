# coding: utf-8
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib import auth
from commons.django_model_utils import get_or_none
from commons.django_views_utils import ajax_login_required
from core.service import log_svc, tweeter_svc, user_svc
from django.views.decorators.csrf import csrf_exempt


def dapau(request):
    raise Exception('break on purpose')


@csrf_exempt
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_dict = None
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            log_svc.log_login(request.user)
            user_dict = _user2dict(user)
    return JsonResponse(user_dict, safe=False)


def logout(request):
    if request.method.lower() != 'post':
        raise Exception('Logout only via post')
    if request.user.is_authenticated():
        log_svc.log_logout(request.user)
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')


def whoami(request):
    i_am = {
        'user': _user2dict(request.user),
        'authenticated': True,
    } if request.user.is_authenticated() else {'authenticated': False}
    return JsonResponse(i_am)


def list_tweets(request):
    logged_user = request.user if request.user.is_authenticated() else None
    username = request.GET.get('username')
    tweets = tweeter_svc.list_tweets(logged_user, username)
    return JsonResponse(tweets, safe=False)


def get_user_details(request):
    logged_user = request.user if request.user.is_authenticated() else None
    username = request.GET.get('username')
    userdetails = user_svc.get_details(logged_user, username)
    return JsonResponse(userdetails)

@ajax_login_required
def follow(request):
    username = request.POST['username']
    tweeter_svc.follow(request.user, username)
    return JsonResponse({})


@ajax_login_required
def unfollow(request):
    username = request.POST['username']
    tweeter_svc.unfollow(request.user, username)
    return JsonResponse({})


@ajax_login_required
def tweet(request):
    text = request.POST['text']
    tweet = tweeter_svc.tweet(request.user, text)
    return JsonResponse(tweet)


def _user2dict(user):
    d = {
        'id': user.id,
        'name': user.get_full_name(),
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'permissions': {
            'ADMIN': user.is_superuser,
            'STAFF': user.is_staff,
        }
    }
    return d
