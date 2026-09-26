import json
from pathlib import Path


DATA_DIR = Path("data")


def load_set(set_number):
    path = DATA_DIR / f"set-{set_number:03d}" / "reading.json"

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)

    questions = data if isinstance(data, list) else data["questions"]

    return path, data, questions


def find_question(questions, question_id):
    matches = [
        question
        for question in questions
        if question.get("id") == question_id
    ]

    if len(matches) != 1:
        raise RuntimeError(
            f"Expected exactly one Q{question_id}, found {len(matches)}"
        )

    return matches[0]


def save(path, data):
    with path.open("w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=2
        )
        file.write("\n")


def update_question(set_number, question_id, updater):
    path, data, questions = load_set(set_number)

    question = find_question(
        questions,
        question_id
    )

    updater(question)

    save(path, data)

    print(
        f"Fixed set-{set_number:03d} Q{question_id}"
    )


# =========================================================
# SET 004 Q10
# =========================================================

def fix_set_004_q10(q):
    q["options"] = [
        "4시간 이상이 가장 많습니다.",
        "2시간이 가장 많습니다.",
        "1시간은 10%입니다.",
        "2시간과 3시간은 같습니다."
    ]

    q["answer"] = 1


update_question(
    4,
    10,
    fix_set_004_q10
)


# =========================================================
# SET 005 Q10
# =========================================================

def fix_set_005_q10(q):
    q["options"] = [
        "8시와 9시는 같습니다.",
        "7시는 10%입니다.",
        "8시가 가장 많습니다.",
        "10시가 가장 많습니다."
    ]

    q["answer"] = 2


update_question(
    5,
    10,
    fix_set_005_q10
)


# =========================================================
# SET 017 Q4
# Correct answer = option 3 / answer index 2
# =========================================================

def fix_set_017_q4(q):
    q["type"] = "grammar_judgment"

    q["prompt"] = (
        "다음 중 밑줄 친 부분이 맞는 것을 고르십시오."
    )

    q["options"] = [
        "어제 회사에 [[갑니다]].",
        "내일 병원에 [[갔습니다]].",
        "지금 동료와 [[이야기하고 있습니다]].",
        "지난주에 일을 [[할 거예요]]."
    ]

    q["answer"] = 2


update_question(
    17,
    4,
    fix_set_017_q4
)


# =========================================================
# SET 020 Q4
# Correct answer = option 1 / answer index 0
# =========================================================

def fix_set_020_q4(q):
    q["type"] = "grammar_judgment"

    q["prompt"] = (
        "다음 중 밑줄 친 부분이 맞는 것을 고르십시오."
    )

    q["options"] = [
        "지금 동료와 [[이야기하고 있습니다]].",
        "어제 회사에 [[갑니다]].",
        "내일 병원에 [[갔습니다]].",
        "지난주에 일을 [[할 거예요]]."
    ]

    q["answer"] = 0


update_question(
    20,
    4,
    fix_set_020_q4
)


# =========================================================
# SET 026 Q4
# =========================================================

def fix_set_026_q4(q):
    q["type"] = "grammar_judgment"

    q["prompt"] = (
        "다음 중 밑줄 친 부분이 맞는 것을 고르십시오."
    )

    q["options"] = [
        "물품을 선반 위에 [[올려 놓았어요를]].",
        "물품을 선반 위에 [[올려 놓고 싶습니다요]].",
        "물품을 선반 위에 [[올려 놓았습니다]].",
        "어제 물품을 선반 위에 [[올려 놓을 거예요]]."
    ]

    q["answer"] = 2


update_question(
    26,
    4,
    fix_set_026_q4
)


# =========================================================
# SETS 051–075 Q4
#
# Keep each existing answer position.
# Remove all ugly:
# 을(를)
# 이(가)
# 은(는)
# etc.
#
# Each Q4 has exactly one grammatically correct ending.
# =========================================================

Q4_SPECS = {
    51: (
        2,
        "자동차 부품 공장에서 부품을 조립하기 전에 토크 렌치를"
    ),
    52: (
        0,
        "수산물 가공장에서 수산물을 세척하기 전에 고무장갑을"
    ),
    53: (
        2,
        "비닐하우스 농장에서 토마토를 수확하기 전에 작업 장갑을"
    ),
    54: (
        2,
        "물류센터에서 택배 상자를 분류하기 전에 바코드 단말기를"
    ),
    55: (
        1,
        "건설 현장에서 자재를 운반하기 전에 안전모를"
    ),
    56: (
        0,
        "금속 가공 공장에서 금속판을 절단하기 전에 보안경을"
    ),
    57: (
        3,
        "식품 포장 공장에서 포장 식품을 포장하기 전에 위생모를"
    ),
    58: (
        2,
        "양계장에서 달걀을 선별하기 전에 위생 장갑을"
    ),
    59: (
        2,
        "가구 공장에서 목재를 가공하기 전에 방진 마스크를"
    ),
    60: (
        0,
        "세탁 공장에서 세탁물을 분류하기 전에 고무장갑을"
    ),
    61: (
        3,
        "아파트 관리실에서 시설을 점검하기 전에 안전 장갑을"
    ),
    62: (
        2,
        "자동차 정비소에서 차량을 정비하기 전에 보안경을"
    ),
    63: (
        2,
        "용접 작업장에서 철재를 용접하기 전에 보안면을"
    ),
    64: (
        1,
        "과수원에서 사과를 수확하기 전에 작업 장갑을"
    ),
    65: (
        0,
        "창고에서 재고를 정리하기 전에 안전화를"
    ),
    66: (
        2,
        "주방에서 식재료를 손질하기 전에 위생 장갑을"
    ),
    67: (
        3,
        "병원 시설팀에서 시설을 수리하기 전에 보호 장갑을"
    ),
    68: (
        2,
        "도로 공사장에서 포장 자재를 정리하기 전에 안전 조끼를"
    ),
    69: (
        1,
        "전자제품 공장에서 전자 부품을 조립하기 전에 "
        "정전기 방지 장갑을"
    ),
    70: (
        1,
        "재활용 선별장에서 재활용품을 분리하기 전에 보호 장갑을"
    ),
    71: (
        3,
        "섬유 공장에서 원단을 재단하기 전에 보호 장갑을"
    ),
    72: (
        0,
        "농산물 포장장에서 채소를 선별하기 전에 위생 장갑을"
    ),
    73: (
        2,
        "기계 조립 공장에서 기계 부품을 조립하기 전에 안전화를"
    ),
    74: (
        1,
        "냉동 창고에서 냉동 식품을 보관하기 전에 방한 장갑을"
    ),
    75: (
        2,
        "조선 작업장에서 금속 자재를 용접하기 전에 보안면을"
    ),
}


def build_q4_options(prefix, answer_index):
    correct = (
        f"{prefix} [[준비했습니다]]."
    )

    wrong_options = [
        f"{prefix} [[준비했어요를]].",
        f"{prefix} [[준비하고 싶습니다요]].",
        f"{prefix} [[준비했습니다가]]."
    ]

    options = []

    wrong_index = 0

    for index in range(4):
        if index == answer_index:
            options.append(correct)
        else:
            options.append(
                wrong_options[wrong_index]
            )
            wrong_index += 1

    return options


for set_number, (
    answer_index,
    sentence_prefix
) in Q4_SPECS.items():

    def make_q4_updater(
        answer_index=answer_index,
        sentence_prefix=sentence_prefix
    ):
        def updater(q):
            q["type"] = "grammar_judgment"

            q["prompt"] = (
                "다음 중 밑줄 친 부분이 맞는 것을 고르십시오."
            )

            q["options"] = build_q4_options(
                sentence_prefix,
                answer_index
            )

            q["answer"] = answer_index

        return updater

    update_question(
        set_number,
        4,
        make_q4_updater()
    )


# =========================================================
# SET 051 Q8
# =========================================================

def fix_set_051_q8(q):
    q["options"][2] = (
        "토크 렌치를 준비합니다."
    )

    q["answer"] = 2


update_question(
    51,
    8,
    fix_set_051_q8
)


# =========================================================
# SET 054 Q8
# =========================================================

def fix_set_054_q8(q):
    q["options"][2] = (
        "바코드 단말기를 준비합니다."
    )

    q["answer"] = 2


update_question(
    54,
    8,
    fix_set_054_q8
)


# =========================================================
# Q5 — ID / ACCESS CARD
# =========================================================

ID_CARD_FIXES = {
    88: 1,
    91: 1,
    97: 1,
    100: 3,
}


for set_number, answer_index in ID_CARD_FIXES.items():

    def make_id_card_updater(
        answer_index=answer_index
    ):
        def updater(q):
            q["stem"] = (
                "병원, 관공서, 회사 등에 들어갈 때 "
                "신분을 확인하기 위해 보여 주는 것입니다."
            )

            q["options"][answer_index] = (
                "출입증"
            )

            q["answer"] = (
                answer_index
            )

        return updater

    update_question(
        set_number,
        5,
        make_id_card_updater()
    )


# =========================================================
# SETS 086–100 Q6
#
# Rewrite completely because current stem/options do not match.
# Existing answer positions are preserved.
# =========================================================

Q6_REPLACEMENTS = {
    86: {
        "stem": "물류 창고에서 상자를 옮기기 전에 _______.",
        "options": [
            "통로에 상자를 더 쌓아 두어야 합니다",
            "통로에 장애물이 없는지 확인해야 합니다",
            "안전화를 벗어 두어야 합니다",
            "무거운 상자를 혼자 들어야 합니다"
        ],
        "answer": 1
    },

    87: {
        "stem": "조립 기계를 작동하기 전에 _______.",
        "options": [
            "전원과 안전장치를 확인해야 합니다",
            "기계를 바로 최고 속도로 작동해야 합니다",
            "보호 장비를 벗어 두어야 합니다",
            "작업대에 공구를 흩어 놓아야 합니다"
        ],
        "answer": 0
    },

    88: {
        "stem": "기숙사 공용 주방을 사용하기 전에 _______.",
        "options": [
            "바닥에 물을 뿌려 두어야 합니다",
            "가스레인지를 먼저 켜 두어야 합니다",
            "가스 밸브와 주변 상태를 확인해야 합니다",
            "환풍기를 끄고 문을 닫아야 합니다"
        ],
        "answer": 2
    },

    89: {
        "stem": "냉장 창고에 들어가기 전에 _______.",
        "options": [
            "문을 잠그고 혼자 들어가야 합니다",
            "방한복을 벗어 두어야 합니다",
            "방한복과 미끄럼 방지 신발을 착용해야 합니다",
            "통로에 상자를 쌓아 두어야 합니다"
        ],
        "answer": 2
    },

    90: {
        "stem": "건설 현장에서 작업을 시작하기 전에 _______.",
        "options": [
            "안전모와 안전화를 착용해야 합니다",
            "안전모를 벗고 작업해야 합니다",
            "위험 구역에 바로 들어가야 합니다",
            "보호 장비를 작업장 밖에 두어야 합니다"
        ],
        "answer": 0
    },

    91: {
        "stem": "비닐하우스에서 농약을 사용하기 전에 _______.",
        "options": [
            "마스크를 벗어 두어야 합니다",
            "농약을 맨손으로 확인해야 합니다",
            "창문을 모두 닫아 두어야 합니다",
            "마스크와 보호 장갑을 착용해야 합니다"
        ],
        "answer": 3
    },

    92: {
        "stem": "환자의 이동을 돕기 전에 _______.",
        "options": [
            "휠체어의 브레이크를 풀어 두어야 합니다",
            "휠체어의 브레이크 상태를 확인해야 합니다",
            "환자를 혼자 일으켜 세워야 합니다",
            "이동 통로에 물건을 놓아 두어야 합니다"
        ],
        "answer": 1
    },

    93: {
        "stem": "지게차를 운전하기 전에 _______.",
        "options": [
            "짐을 높이 올린 채 출발해야 합니다",
            "통로에 사람이 있어도 바로 출발해야 합니다",
            "안전벨트를 풀어 두어야 합니다",
            "주변 사람과 통로 상태를 확인해야 합니다"
        ],
        "answer": 3
    },

    94: {
        "stem": "기계 조립 작업을 시작하기 전에 _______.",
        "options": [
            "보호 장비와 공구 상태를 확인해야 합니다",
            "고장 난 공구도 그대로 사용해야 합니다",
            "보호 안경을 벗어 두어야 합니다",
            "작업대를 정리하지 않아도 됩니다"
        ],
        "answer": 0
    },

    95: {
        "stem": "냉동 작업장에 들어가기 전에 _______.",
        "options": [
            "방한 장갑과 미끄럼 방지 신발을 착용해야 합니다",
            "젖은 신발을 신고 들어가야 합니다",
            "방한복을 벗어 두어야 합니다",
            "출입문을 열린 채 두어야 합니다"
        ],
        "answer": 0
    },

    96: {
        "stem": "재단기를 사용하기 전에 _______.",
        "options": [
            "안전 덮개를 제거해야 합니다",
            "천을 손으로 칼날 가까이 밀어야 합니다",
            "칼날과 안전 덮개의 상태를 확인해야 합니다",
            "기계를 켠 뒤에 점검해야 합니다"
        ],
        "answer": 2
    },

    97: {
        "stem": "전자 부품을 검사하기 전에 _______.",
        "options": [
            "부품을 젖은 손으로 만져야 합니다",
            "정전기 방지 장비를 벗어 두어야 합니다",
            "검사대를 정리하지 않아도 됩니다",
            "정전기 방지 손목띠를 착용해야 합니다"
        ],
        "answer": 3
    },

    98: {
        "stem": "무거운 이삿짐을 옮기기 전에 _______.",
        "options": [
            "통로에 다른 짐을 놓아 두어야 합니다",
            "허리를 굽힌 채 혼자 들어야 합니다",
            "급하게 뛰어서 옮겨야 합니다",
            "이동 경로에 장애물이 없는지 확인해야 합니다"
        ],
        "answer": 3
    },

    99: {
        "stem": "주방에서 칼을 사용하기 전에 _______.",
        "options": [
            "젖은 손으로 칼을 잡아야 합니다",
            "칼을 작업대 끝에 놓아야 합니다",
            "도마 없이 재료를 잘라야 합니다",
            "도마가 흔들리지 않는지 확인해야 합니다"
        ],
        "answer": 3
    },

    100: {
        "stem": "사무실에서 전기 장비를 사용하기 전에 _______.",
        "options": [
            "전선이나 플러그가 손상되지 않았는지 확인해야 합니다",
            "젖은 손으로 플러그를 꽂아야 합니다",
            "손상된 전선도 그대로 사용해야 합니다",
            "콘센트에 여러 기기를 한꺼번에 연결해야 합니다"
        ],
        "answer": 0
    }
}


for set_number, replacement in Q6_REPLACEMENTS.items():

    def make_q6_updater(
        replacement=replacement
    ):
        def updater(q):
            q["type"] = "blank"

            q["prompt"] = (
                "빈칸에 들어갈 가장 알맞은 것을 고르십시오."
            )

            q["stem"] = (
                replacement["stem"]
            )

            q["options"] = (
                replacement["options"]
            )

            q["answer"] = (
                replacement["answer"]
            )

        return updater

    update_question(
        set_number,
        6,
        make_q6_updater()
    )


# =========================================================
# FINAL VALIDATION
# =========================================================

sets_to_validate = (
    [4, 5, 17, 20, 26]
    + list(range(51, 76))
    + list(range(86, 101))
)


for set_number in sorted(set(sets_to_validate)):
    path, data, questions = load_set(
        set_number
    )

    ids = [
        q.get("id")
        for q in questions
    ]

    if len(ids) != len(set(ids)):
        raise RuntimeError(
            f"Duplicate question IDs in set-{set_number:03d}"
        )

    for question in questions:
        options = question.get("options")

        if options is not None:
            if len(options) != 4:
                raise RuntimeError(
                    f"set-{set_number:03d} "
                    f"Q{question.get('id')} "
                    f"does not have 4 options"
                )

            answer = question.get("answer")

            if answer not in (0, 1, 2, 3):
                raise RuntimeError(
                    f"set-{set_number:03d} "
                    f"Q{question.get('id')} "
                    f"has invalid answer {answer}"
                )


print()
print("PASS 1 COMPLETE")
print("All edited JSON files are valid.")