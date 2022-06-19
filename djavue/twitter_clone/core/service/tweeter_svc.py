from core.models import Seguindo, Tweet, User


def follow(user, username):
    userpara = User.objects.get(username=username)

    if Seguindo.objects.filter(de=user, para=userpara).count() == 0:
        Seguindo.objects.create(de=user, para=userpara)


def unfollow(user, username):
    userpara = User.objects.get(username=username)
    Seguindo.objects.filter(de=user, para=userpara).delete()


def tweet(user, text):
    return Tweet.objects.create(user=user, text=text)


def list_tweets(logged_user, username):
    if username:
        tweets = Tweet.objects.filter(user__username=username)
    else:
        if logged_user:
            tweets = Tweet.objects.filter(user__in=User.objects.filter(seguindo_para__de=logged_user))
        else:
            tweets = Tweet.objects.all()
    tweets = tweets.order_by('-created_at')
    return [t.to_dict_json() for t in tweets]
