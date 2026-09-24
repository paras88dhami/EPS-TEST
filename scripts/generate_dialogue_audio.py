import argparse
import asyncio
import json
from pathlib import Path

import edge_tts


MALE_VOICE = "ko-KR-InJoonNeural"
FEMALE_VOICE = "ko-KR-SunHiNeural"

RATE = "-15%"

DATA_DIR = Path("data")
AUDIO_DIR = Path("assets/audio")


def voice_for_speaker(speaker):
    if str(speaker).lower() == "male":
        return MALE_VOICE

    return FEMALE_VOICE


async def generate_audio(text, voice, output_path):
    output_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate=RATE
    )

    await communicate.save(
        str(output_path)
    )


async def process_set(
    set_name,
    dry_run=False,
    force=False
):
    listening_path = (
        DATA_DIR /
        set_name /
        "listening.json"
    )

    if not listening_path.exists():
        return {
            "questions": 0,
            "turns": 0,
            "generated": 0,
            "skipped": 0
        }

    with listening_path.open(
        "r",
        encoding="utf-8"
    ) as file:
        data = json.load(file)

    questions = (
        data
        if isinstance(data, list)
        else data.get("questions", [])
    )

    dialogue_questions = 0
    dialogue_turns = 0
    generated = 0
    skipped = 0
    changed = False

    for question in questions:
        audio = question.get("audio")

        if not audio:
            continue

        if audio.get("mode") != "dialogue":
            continue

        dialogue = audio.get("dialogue")

        if not dialogue:
            continue

        dialogue_questions += 1

        question_id = question.get("id")

        for index, turn in enumerate(
            dialogue,
            start=1
        ):
            dialogue_turns += 1

            text = str(
                turn.get("text", "")
            ).strip()

            if not text:
                continue

            speaker = str(
                turn.get("speaker", "female")
            ).lower()

            voice = voice_for_speaker(
                speaker
            )

            filename = (
                f"q{question_id}-"
                f"{index:02d}-"
                f"{speaker}.mp3"
            )

            relative_path = (
                AUDIO_DIR /
                set_name /
                filename
            )

            src = relative_path.as_posix()

            if dry_run:
                status = (
                    "exists"
                    if relative_path.exists()
                    else "generate"
                )

                print(
                    f"[{status}] "
                    f"{src} "
                    f"({voice})"
                )

                continue

            if (
                relative_path.exists()
                and not force
            ):
                skipped += 1

                if turn.get("src") != src:
                    turn["src"] = src
                    changed = True

                continue

            print(
                f"[generating] "
                f"{src} "
                f"({voice})"
            )

            await generate_audio(
                text,
                voice,
                relative_path
            )

            turn["src"] = src

            changed = True
            generated += 1

            await asyncio.sleep(0.15)

    if changed and not dry_run:
        with listening_path.open(
            "w",
            encoding="utf-8"
        ) as file:
            json.dump(
                data,
                file,
                ensure_ascii=False,
                indent=2
            )

            file.write("\n")

    return {
        "questions": dialogue_questions,
        "turns": dialogue_turns,
        "generated": generated,
        "skipped": skipped
    }


async def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--dry-run",
        action="store_true"
    )

    parser.add_argument(
        "--force",
        action="store_true"
    )

    parser.add_argument(
        "--set",
        dest="set_number"
    )

    args = parser.parse_args()

    if args.set_number:
        raw = str(
            args.set_number
        ).lower()

        raw = raw.replace(
            "set-",
            ""
        )

        set_names = [
            f"set-{int(raw):03d}"
        ]

    else:
        set_names = sorted([
            path.name
            for path in DATA_DIR.glob(
                "set-*"
            )
            if path.is_dir()
        ])

    total_questions = 0
    total_turns = 0
    total_generated = 0
    total_skipped = 0

    for set_name in set_names:
        result = await process_set(
            set_name,
            dry_run=args.dry_run,
            force=args.force
        )

        total_questions += result["questions"]
        total_turns += result["turns"]
        total_generated += result["generated"]
        total_skipped += result["skipped"]

    print()
    print(
        f"Sets scanned: {len(set_names)}"
    )

    print(
        f"Dialogue questions: {total_questions}"
    )

    print(
        f"Dialogue turns: {total_turns}"
    )

    if args.dry_run:
        print(
            "Dry run only. No files were changed."
        )
    else:
        print(
            f"Generated: {total_generated}"
        )

        print(
            f"Skipped existing: {total_skipped}"
        )


if __name__ == "__main__":
    asyncio.run(main())
