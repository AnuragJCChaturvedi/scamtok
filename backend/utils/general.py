


def make_prompt(user_profile):
    with open('./prompts/user_profile.txt','r') as f:
        return f.read().format(**{"user_profile":user_profile})

def post_process(response):
    return ''.join(response.split()[1:])




