from core.models import Seguindo, Tweet, User

def get_details(logged_user, username):
    user = User.objects.get(username=username)
    q = Tweet.objects.filter(user=user).order_by('-created_at')
    if q.count() > 0:
        tweet = q[0].text

    ifollow = False
    if logged_user:
        ifollow = Seguindo.objects.filter(de=logged_user, para=user).count() > 0

    return {
        'username': user.username,
        'avatar': 'TODO', # TODO: depois a gente ve
        'last_tweet': tweet,
        'ifollow': ifollow
    }