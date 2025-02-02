import json

def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def match_question_difficulty(user_profile, question):

    user_profile = load_json('./')


    user_level = user_profile.get('level')
    question_difficulty = question.get('difficulty')
    
    if user_level == question_difficulty:
        return True
    return False

def main():
    user_profile = load_json('./data/questions/user_profiles/user_001.json')
    
    question = load_json('./data/questions/mcq_fact.json')
    
    if match_question_difficulty(user_profile, question):
        print("The question difficulty matches the user's level.")
    else:
        print("The question difficulty does not match the user's level.")

if __name__ == "__main__":
    main()