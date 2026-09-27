# Current EPS-TOPIK 40-Question Pattern Audit

This read-only audit covers **90 sets** and **3600 question records**. The repository consistently marks **Q1-Q20 as Reading** and **Q21-Q40 as Listening**. Answers use zero-based indexes (0-3). Current facts below are derived from repository data; recommendations are explicitly labeled.

Character counts exclude whitespace and markup. Word counts use whitespace-delimited tokens. Min/average/max are written as `min/avg/max`. For Q11-Q16, visual lines are approximate at the current desktop UI width. Dialogue duration is measured from the real MP3 files plus the configured pause between turns.

## Master table

| Q | Section | Type | Skill | Input | Options | Media | Current Length | Recommended Length | Difference/Purpose |
|---|---|---|---|---|---:|---|---|---|---|
| Q1 | Reading | image_choice | Identify a pictured object and its vocabulary label | Visible main image + prompt | 4 | Main image references: media=90, image=0; text options. | prompt 16/18.03/21 chars; options 1/3.2/9 | question_chars 10-30, option_chars 2-12, image one clear main image | Starts reading with object naming; Q2 instead requires sentence-to-scene matching. |
| Q2 | Reading | image_sentence dominant; variants: image_sentence, image_choice | Match a visible action or scene to a sentence | Visible main image + prompt | 4 | Main image references: media=90, image=0; text options. | prompt 19/19/19 chars; options 2/10.91/19 | question_chars 10-35, option_chars 10-40, image one unambiguous action/scene image | Uses a main scene but tests a whole sentence; Q1 tests a short label and Q3 removes the image. |
| Q3 | Reading | word_completion dominant; variants: word_completion, spelling, completion, same, spacing, particle | Word formation, spelling, spacing, particles, or lexical completion | Visible text | 4 | No required image in the dominant pattern. | prompt 14/17.29/29 chars; context 4/11.26/33; options 1/1.99/12 | question_chars 10-35, context_chars 5-45, option_chars 1-18 | Tests form/orthography/word completion; unlike Q2 it is text-based and unlike Q4 it is not a full grammar judgment. Current sets mix several subtypes. |
| Q4 | Reading | grammar_judgment dominant; variants: grammar_judgment, grammar | Recognize the grammatically correct underlined form | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19.5/31 chars; options 6/20.13/37 | question_chars 10-35, option_chars 12-50 | Tests grammatical correctness among full forms; Q3 focuses word form and Q5 lexical meaning. |
| Q5 | Reading | vocabulary_practical dominant; variants: vocabulary_practical, same, antonym, relation | Recognize a lexical relationship or practical vocabulary meaning | Visible text | 4 | No required image in the dominant pattern. | prompt 18/18.11/19 chars; context 2/10.5/33; options 2/3.22/7 | question_chars 10-35, option_chars 2-35 | Begins the lexical-relation block; Q6 and Q7 currently overlap but use different intended relations/contexts. |
| Q6 | Reading | vocabulary_practical dominant; variants: vocabulary_practical, blank | Recognize an antonym or complete a practical context | Visible text | 4 | No required image in the dominant pattern. | prompt 17/17.56/19 chars; context 2/10.24/24; options 2/5.34/23 | question_chars 10-35, option_chars 2-35 | Targets antonym or contextual completion; current subtype changes in newer sets, so it is not consistently distinct from Q5/Q7. |
| Q7 | Reading | vocabulary_practical dominant; variants: vocabulary_practical, notice | Recognize a semantic relationship or interpret a short notice | Visible text | 4 | No required image in the dominant pattern. | prompt 15/16.33/19 chars; context 1/8.98/31; options 1/5.24/19 | question_chars 10-35, option_chars 2-35 | Targets relation or notice meaning; newer sets use notices, making it more contextual than Q6. |
| Q8 | Reading | vocabulary_practical dominant; variants: vocabulary_practical, sequence | Choose the correct process or event sequence | Visible text | 4 | No required image in the dominant pattern. | prompt 16/18.2/36 chars; context 5/13.51/21; options 2/8.84/21 | question_chars 10-35, option_chars 2-35 | Uniquely tests sequence/procedure rather than a static lexical relation. |
| Q9 | Reading | vocabulary_practical dominant; variants: vocabulary_practical, relation, antonym, same | Connect a description/notice with the related word or meaning | Visible text | 4 | No required image in the dominant pattern. | prompt 17/17.5/19 chars; context 2/10.74/29; options 2/8.93/21 | question_chars 10-35, option_chars 2-35 | Returns to relation/meaning with a description or notice; Q8 tests order and Q10 adds a visual. |
| Q10 | Reading | image_choice dominant; variants: graph, image_choice, vocabulary_practical, photo | Interpret a chart, object image, or workplace photo | Visible image/chart/photo + prompt | 4 | Main image references: media=70, image=0; text options; 20 vocabulary-practical variants have no main image. | prompt 16/18.01/21 chars; context 8/12.48/21; options 1/6.24/21 | question_chars 10-35, option_chars 5-45, image one legible chart/photo/object image | Closes the short-reading block with visual interpretation; current chart/object/photo variants are not one stable subtype. |
| Q11 | Reading | context_blank | Complete a workplace context with the needed noun/action | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 42/53.5/62; options 2/2/2 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | First two-line context blank; establishes the workplace/task and tests a needed noun/action. |
| Q12 | Reading | context_blank | Complete a workplace context with a causal/connective form | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 44/52.94/62; options 2/2.4/4 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | Uses the same context format as Q11 but specifically tests cause/connective logic. |
| Q13 | Reading | context_blank | Complete a post-task context with the appropriate action | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 47/54.02/62; options 1/2.55/3 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | Tests a post-task action verb, rather than Q12's connective or Q14's hazard response. |
| Q14 | Reading | context_blank | Choose the correct immediate safety response | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 52/57.54/65; options 3/4.35/5 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | Tests an immediate safety command in a hazard situation. |
| Q15 | Reading | context_blank | Complete a PPE/safety action using the right connective form | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 46/53.58/63; options 3/3.8/4 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | Tests PPE/action plus connective form; distinct from Q14's emergency stop response. |
| Q16 | Reading | context_blank | Choose the correct final check or closing action | Visible text | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 47/53.74/60; options 3/4.6/5 | question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25 | Ends the context-blank sequence with a final check/closing action. |
| Q17 | Reading | definition dominant; variants: definition_to_word, definition | Map a functional definition to the correct word | Visible text | 4 | No required image in the dominant pattern. | prompt 16/16.67/17 chars; context 12/28.99/39; options 1/2.88/7 | question_chars 10-35, context_chars 25-80, option_chars 2-15 | Definition-to-word mapping; shorter and more lexical than the passage comprehension in Q18. |
| Q18 | Reading | short_reading | Find an explicit detail in a short passage | Visible text | 4 | No required image in the dominant pattern. | prompt 17/18.67/19 chars; context 39/68.36/109; options 9/15.54/26 | question_chars 10-35, context_chars 50-160, option_chars 12-65 | Short narrative/detail passage; Q19 shifts to a formatted practical document. |
| Q19 | Reading | practical_reading dominant; variants: practical_document, practical_reading | Interpret a practical notice, schedule, or workplace document | Visible text | 4 | No required image in the dominant pattern. | prompt 17/17.17/18 chars; context 27/50.16/69; options 9/15.19/25 | question_chars 10-35, context_chars 50-190, option_chars 12-70 | Practical notice/schedule/document interpretation; Q20 is a longer prose procedure. |
| Q20 | Reading | long_reading | Comprehend details and procedure in a longer passage | Visible text | 4 | No required image in the dominant pattern. | prompt 17/18.67/19 chars; context 62/102.73/145; options 11/16.99/26 | question_chars 10-35, context_chars 100-300, option_chars 12-80 | Longest reading passage and final reading item; followed by audio-only input at Q21. |
| Q21 | Listening | listen_text | Discriminate a spoken word and select matching text | Single-speaker TTS word | 4 | No required image in the dominant pattern. | prompt 10/10.09/18 chars; options 2/12.42/22 | spoken_chars 2-15, option_chars 2-15 | First listening item: heard word to visible text; structurally almost identical to Q22. |
| Q22 | Listening | listen_text | Discriminate a spoken word and select matching text | Single-speaker TTS word | 4 | No required image in the dominant pattern. | prompt 10/10/10 chars; options 2/12.42/22 | spoken_chars 2-15, option_chars 2-15 | Second heard-word/text choice; current data does not enforce a clear subtype difference from Q21. |
| Q23 | Listening | listen_image | Map a heard word/short expression to an image | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.6/23 chars | spoken_chars 2-25, image_options 4 | Begins heard-word-to-image items; Q23-Q27 share the same schema and differ mainly by vocabulary/image content. |
| Q24 | Listening | listen_image | Map a heard word/short expression to an image | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.67/23 chars | spoken_chars 2-25, image_options 4 | Same image-listening schema as Q23/Q25; variation is content rather than a coded skill subtype. |
| Q25 | Listening | listen_image | Map a heard word/short expression to an image | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.47/23 chars | spoken_chars 2-25, image_options 4 | Middle heard-word-to-image slot; no structural distinction is enforced from Q23-Q27. |
| Q26 | Listening | listen_image | Map a heard word/short expression to an image | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.47/23 chars | spoken_chars 2-25, image_options 4 | Same image-listening schema; should vary lexical category and visuals from neighboring slots. |
| Q27 | Listening | listen_image | Map a heard word/short expression to an image | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.33/23 chars | spoken_chars 2-25, image_options 4 | Final short heard-word-to-image slot before spoken-response questions begin. |
| Q28 | Listening | audio_only_options | Select an appropriate spoken response to a short question | Single-speaker TTS question + four separately playable spoken responses | 4 | No required image in the dominant pattern. | prompt 20/20/20 chars; options 6/9.62/15 | spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4 | First audio-only response-choice item; answer choices are heard separately, not shown as text. |
| Q29 | Listening | audio_only_options | Select an appropriate spoken response about status/permission | Single-speaker TTS question + four separately playable spoken responses | 4 | No required image in the dominant pattern. | prompt 19/19.98/20 chars; options 5/9.54/17 | spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4 | Same audio-only interface as Q28 but intended to emphasize status/permission response. |
| Q30 | Listening | audio_only_options | Select an appropriate spoken response about place/suggestion | Single-speaker TTS question + four separately playable spoken responses | 4 | No required image in the dominant pattern. | prompt 19/19.99/20 chars; options 6/9.58/17 | spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4 | Same interface, intended to emphasize place/suggestion response. |
| Q31 | Listening | audio_only_options | Select an appropriate spoken response giving a reason | Single-speaker TTS question + four separately playable spoken responses | 4 | No required image in the dominant pattern. | prompt 19/19.99/20 chars; options 6/10.44/16 | spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4 | Same interface, intended to emphasize a reason/explanation response. |
| Q32 | Listening | audio_only_options | Select an appropriate spoken response about intention/action | Single-speaker TTS question + four separately playable spoken responses | 4 | No required image in the dominant pattern. | prompt 17/19.94/20 chars; options 6/9.62/19 | spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4 | Final audio-only response item, intended to emphasize intention/next action; Q33 becomes a dialogue. |
| Q33 | Listening | continuation | Choose the natural next line after a four-turn dialogue | Four-turn, two-speaker prerecorded dialogue | 4 | No required image in the dominant pattern. | prompt 24/24/24 chars; options 17/21.68/30; dialogue 22.75/26.8/30.53s | dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70 | Continuation: choose the next utterance. Q38-Q40 ask comprehension about a completed dialogue instead. |
| Q34 | Listening | listen_image | Identify a heard time or number from image choices | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.33/23 chars | spoken_chars 5-50, image_options 4 | Returns to single-speaker image listening, emphasizing time/number rather than dialogue continuation. |
| Q35 | Listening | listen_image | Identify a heard price or quantity from image choices | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.33/23 chars | spoken_chars 5-50, image_options 4 | Image listening emphasizing price/quantity; adjacent Q34 emphasizes time/number. |
| Q36 | Listening | listen_image | Identify a heard spatial/location detail from image choices | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/22.47/23 chars | spoken_chars 5-50, image_options 4 | Image listening emphasizing spatial/location relations rather than numeric discrimination. |
| Q37 | Listening | listen_image dominant; variants: audio_to_picture_options, listen_image | Infer the matching action/scene from a short utterance | Single-speaker TTS + four image options | 4 | Four image options in 90/90 sets; answer comes from audio. | prompt 17/21.47/23 chars | spoken_chars 5-50, image_options 4 | Image listening requiring action/scene inference; Q38 switches to two-speaker topic comprehension. |
| Q38 | Listening | dialogue_comprehension | Identify the topic/purpose of a four-turn dialogue | Four-turn, two-speaker prerecorded dialogue | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 19/19/19; options 2/5.16/10; dialogue 24.5/28.18/33.26s | dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70 | Dialogue comprehension focused on topic/purpose; Q33 is continuation and Q39 asks a specific detail. |
| Q39 | Listening | dialogue_comprehension | Recall a specific detail from a four-turn dialogue | Four-turn, two-speaker prerecorded dialogue | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 12/15.84/21; options 2/5.77/11; dialogue 22.66/26.95/30.0s | dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70 | Dialogue comprehension focused on a specific detail; Q40 asks for a true/global statement. |
| Q40 | Listening | dialogue_comprehension | Choose the true/global-comprehension statement after a dialogue | Four-turn, two-speaker prerecorded dialogue | 4 | No required image in the dominant pattern. | prompt 19/19/19 chars; context 15/15/15; options 13/17.89/21; dialogue 24.22/27.06/31.44s | dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70 | Final item: global/true-statement dialogue comprehension, broader than Q39's single-detail recall. |

## Current implementation facts

Every set contains 20 reading and 20 listening questions. Every audited question has four options. The current renderer displays main question images from `media`. All current Q1/Q2 main-image records and all 70 image-based Q10 records now use that key. Image-option listening questions continue to use image objects inside their option arrays.

### Current type consistency and exceptions

- Q1: `image_choice` dominant; distribution image_choice=90. Consistency: **CONSISTENT**.
- Q2: `image_sentence` dominant; distribution image_sentence=50, image_choice=40. Consistency: **TYPE_VARIANTS**.
- Q3: `word_completion` dominant; distribution word_completion=75, spelling=3, completion=3, same=3, spacing=3, particle=3. Consistency: **TYPE_VARIANTS**.
- Q4: `grammar_judgment` dominant; distribution grammar_judgment=75, grammar=15. Consistency: **TYPE_VARIANTS**.
- Q5: `vocabulary_practical` dominant; distribution vocabulary_practical=75, same=5, antonym=5, relation=5. Consistency: **TYPE_VARIANTS**.
- Q6: `vocabulary_practical` dominant; distribution vocabulary_practical=75, blank=15. Consistency: **TYPE_VARIANTS**.
- Q7: `vocabulary_practical` dominant; distribution vocabulary_practical=75, notice=15. Consistency: **TYPE_VARIANTS**.
- Q8: `vocabulary_practical` dominant; distribution vocabulary_practical=75, sequence=15. Consistency: **TYPE_VARIANTS**.
- Q9: `vocabulary_practical` dominant; distribution vocabulary_practical=75, relation=5, antonym=5, same=5. Consistency: **TYPE_VARIANTS**.
- Q10: `image_choice` dominant; distribution graph=10, image_choice=45, vocabulary_practical=20, photo=15. Consistency: **TYPE_VARIANTS**.
- Q11: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q12: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q13: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q14: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q15: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q16: `context_blank` dominant; distribution context_blank=90. Consistency: **CONSISTENT**.
- Q17: `definition` dominant; distribution definition_to_word=15, definition=75. Consistency: **TYPE_VARIANTS**.
- Q18: `short_reading` dominant; distribution short_reading=90. Consistency: **CONSISTENT**.
- Q19: `practical_reading` dominant; distribution practical_document=15, practical_reading=75. Consistency: **TYPE_VARIANTS**.
- Q20: `long_reading` dominant; distribution long_reading=90. Consistency: **CONSISTENT**.
- Q21: `listen_text` dominant; distribution listen_text=90. Consistency: **CONSISTENT**.
- Q22: `listen_text` dominant; distribution listen_text=90. Consistency: **CONSISTENT**.
- Q23: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q24: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q25: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q26: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q27: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q28: `audio_only_options` dominant; distribution audio_only_options=90. Consistency: **CONSISTENT**.
- Q29: `audio_only_options` dominant; distribution audio_only_options=90. Consistency: **CONSISTENT**.
- Q30: `audio_only_options` dominant; distribution audio_only_options=90. Consistency: **CONSISTENT**.
- Q31: `audio_only_options` dominant; distribution audio_only_options=90. Consistency: **CONSISTENT**.
- Q32: `audio_only_options` dominant; distribution audio_only_options=90. Consistency: **CONSISTENT**.
- Q33: `continuation` dominant; distribution continuation=90. Consistency: **LOW_DIALOGUE_VARIATION**.
- Q34: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q35: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q36: `listen_image` dominant; distribution listen_image=90. Consistency: **CONSISTENT**.
- Q37: `listen_image` dominant; distribution audio_to_picture_options=15, listen_image=75. Consistency: **TYPE_VARIANTS**.
- Q38: `dialogue_comprehension` dominant; distribution dialogue_comprehension=90. Consistency: **LOW_DIALOGUE_VARIATION**.
- Q39: `dialogue_comprehension` dominant; distribution dialogue_comprehension=90. Consistency: **LOW_DIALOGUE_VARIATION**.
- Q40: `dialogue_comprehension` dominant; distribution dialogue_comprehension=90. Consistency: **LOW_DIALOGUE_VARIATION**.

### Current text lengths by question

Each line gives prompt, stem, passage/context, and effective option statistics as characters and words (`min/avg/max`). For Q28-Q32, effective options are `audio.optionsAudio`, not the intentionally blank visible labels.

- Q1: prompt chars 16/18.03/21, words 5/5.99/7; options chars 1/3.2/9, words 1/1.29/4.
- Q2: prompt chars 19/19/19, words 6/6/6; options chars 2/10.91/19, words 1/2.97/6.
- Q3: prompt chars 14/17.29/29, words 5/5.34/10; stem chars 4/11.26/33, words 1/3.07/10; context chars 4/11.26/33, words 1/3.07/10; options chars 1/1.99/12, words 1/1.2/4.
- Q4: prompt chars 19/19.5/31, words 8/8.18/12; options chars 6/20.13/37, words 2/5.94/11.
- Q5: prompt chars 18/18.11/19, words 6/6.11/7; stem chars 2/10.5/33, words 1/3.73/12; context chars 2/10.5/33, words 1/3.73/12; options chars 2/3.22/7, words 1/1.01/2.
- Q6: prompt chars 17/17.56/19, words 5/5.39/6; stem chars 2/10.24/24, words 1/3.37/6; context chars 2/10.24/24, words 1/3.37/6; options chars 2/5.34/23, words 1/1.71/7.
- Q7: prompt chars 15/16.33/19, words 5/5.39/6; stem chars 1/7.11/14, words 1/3.04/7; passage chars 11/18.33/31, words 4/6.6/11; context chars 1/8.98/31, words 1/3.63/11; options chars 1/5.24/19, words 1/1.94/6.
- Q8: prompt chars 16/18.2/36, words 5/5.76/11; stem chars 5/13.51/21, words 3/5.41/11; context chars 5/13.51/21, words 3/5.41/11; options chars 2/8.84/21, words 1/2.56/8.
- Q9: prompt chars 17/17.5/19, words 5/5.5/7; stem chars 2/10.74/29, words 1/4.11/9; context chars 2/10.74/29, words 1/4.11/9; options chars 2/8.93/21, words 1/2.48/6.
- Q10: prompt chars 16/18.01/21, words 5/5.83/7; stem chars 8/12.48/21, words 4/5.6/10; context chars 8/12.48/21, words 4/5.6/10; options chars 1/6.24/21, words 1/1.95/7.
- Q11: prompt chars 19/19/19, words 6/6/6; stem chars 42/53.5/62, words 14/16.81/21; context chars 42/53.5/62, words 14/16.81/21; options chars 2/2/2, words 1/1/1.
- Q12: prompt chars 19/19/19, words 6/6/6; stem chars 44/52.94/62, words 14/17.31/22; context chars 44/52.94/62, words 14/17.31/22; options chars 2/2.4/4, words 1/1.15/2.
- Q13: prompt chars 19/19/19, words 6/6/6; stem chars 47/54.02/62, words 15/18.23/21; context chars 47/54.02/62, words 15/18.23/21; options chars 1/2.55/3, words 1/1/1.
- Q14: prompt chars 19/19/19, words 6/6/6; stem chars 52/57.54/65, words 16/19.71/24; context chars 52/57.54/65, words 16/19.71/24; options chars 3/4.35/5, words 1/1/1.
- Q15: prompt chars 19/19/19, words 6/6/6; stem chars 46/53.58/63, words 15/18.33/22; context chars 46/53.58/63, words 15/18.33/22; options chars 3/3.8/4, words 1/1/1.
- Q16: prompt chars 19/19/19, words 6/6/6; stem chars 47/53.74/60, words 16/18.11/22; context chars 47/53.74/60, words 16/18.11/22; options chars 3/4.6/5, words 1/1/1.
- Q17: prompt chars 16/16.67/17, words 5/5/5; stem chars 20/30.81/39, words 6/10.01/13; passage chars 12/19.87/29, words 4/6.73/10; context chars 12/28.99/39, words 4/9.47/13; options chars 1/2.88/7, words 1/1.13/2.
- Q18: prompt chars 17/18.67/19, words 6/6.83/7; stem chars 39/51.87/66, words 12/16/23; passage chars 44/71.65/109, words 14/22.24/38; context chars 39/68.36/109, words 12/21.2/38; options chars 9/15.54/26, words 3/4.65/8.
- Q19: prompt chars 17/17.17/18, words 6/6/6; stem chars 27/33.6/40, words 7/12.8/17; passage chars 32/53.47/69, words 11/18.51/22; context chars 27/50.16/69, words 7/17.56/22; options chars 9/15.19/25, words 2/4.63/8.
- Q20: prompt chars 17/18.67/19, words 6/6.83/7; stem chars 74/82.8/98, words 21/27.07/32; passage chars 62/106.72/145, words 19/33.51/47; context chars 62/102.73/145, words 19/32.43/47; options chars 11/16.99/26, words 4/5.42/9.
- Q21: prompt chars 10/10.09/18, words 3/3.04/7; options chars 2/12.42/22, words 1/3.88/7; spoken chars 2/15.99/36, words 1/4.52/12.
- Q22: prompt chars 10/10/10, words 3/3/3; options chars 2/12.42/22, words 1/3.94/8; spoken chars 2/16.86/38, words 1/5.09/13.
- Q23: prompt chars 17/22.6/23, words 5/6.89/7; spoken chars 1/19.29/39, words 1/5.23/13.
- Q24: prompt chars 17/22.67/23, words 5/6.91/7; spoken chars 2/19.3/45, words 1/5.22/13.
- Q25: prompt chars 17/22.47/23, words 5/6.84/7; spoken chars 2/19.42/43, words 1/5.4/13.
- Q26: prompt chars 17/22.47/23, words 5/6.86/7; spoken chars 1/19.26/38, words 1/5.41/14.
- Q27: prompt chars 17/22.33/23, words 5/6.82/7; spoken chars 2/19.67/38, words 1/5.42/12.
- Q28: prompt chars 20/20/20, words 6/6/6; options chars 6/9.62/15, words 1/2.82/6; spoken chars 9/15.73/35, words 3/5.18/12.
- Q29: prompt chars 19/19.98/20, words 6/6/6; options chars 5/9.54/17, words 1/2.99/6; spoken chars 9/15.42/34, words 3/5.14/11.
- Q30: prompt chars 19/19.99/20, words 6/6.01/7; options chars 6/9.58/17, words 1/2.59/6; spoken chars 9/16.43/31, words 2/5.24/10.
- Q31: prompt chars 19/19.99/20, words 6/6.01/7; options chars 6/10.44/16, words 1/3.14/6; spoken chars 9/17.73/33, words 2/5.44/11.
- Q32: prompt chars 17/19.94/20, words 5/5.99/6; options chars 6/9.62/19, words 1/2.99/6; spoken chars 9/16.71/36, words 2/5.58/12.
- Q33: prompt chars 24/24/24, words 8/8/8; options chars 17/21.68/30, words 5/6.78/10.
- Q34: prompt chars 17/22.33/23, words 5/6.81/7; spoken chars 6/20.24/39, words 1/5.92/14.
- Q35: prompt chars 17/22.33/23, words 5/6.81/7; spoken chars 7/21.06/39, words 1/6.02/12.
- Q36: prompt chars 17/22.47/23, words 5/6.86/7; spoken chars 6/20.08/35, words 1/5.64/11.
- Q37: prompt chars 17/21.47/23, words 5/6.51/7; spoken chars 9/23.16/40, words 2/6.52/12.
- Q38: prompt chars 19/19/19, words 6/6/6; stem chars 19/19/19, words 6/6/6; context chars 19/19/19, words 6/6/6; options chars 2/5.16/10, words 1/2.22/4.
- Q39: prompt chars 19/19/19, words 6/6/6; stem chars 12/15.84/21, words 3/4.58/7; context chars 12/15.84/21, words 3/4.58/7; options chars 2/5.77/11, words 1/2.35/4.
- Q40: prompt chars 19/19/19, words 6/6/6; stem chars 15/15/15, words 5/5/5; context chars 15/15/15, words 5/5/5; options chars 13/17.89/21, words 3/5.93/8.

### Q11-Q16 visual-length check

- Q11: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
- Q12: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
- Q13: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
- Q14: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
- Q15: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
- Q16: estimated 2/2/2 lines; within 2-4: 90/90; too short: 0; too long: 0.
This is a desktop-width approximation from the current CSS, not a claim about every mobile viewport.

### Listening and audio pattern

- Q21: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q22: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q23: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q24: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q25: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q26: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q27: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q28: mode {'question_and_options': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q29: mode {'question_and_options': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q30: mode {'question_and_options': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q31: mode {'question_and_options': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q32: mode {'question_and_options': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q33: mode {'dialogue': 90}; maxPlays {'2': 90}; source {'prerecorded MP3 turn src': 360}; turns {'4': 90}; speaker patterns {'male/female/male/female': 45, 'female/male/female/male': 45}; measured duration 22.75/26.8/30.53 seconds, 90/90 within 20-35 seconds, pause setting(s) [400] ms.
- Q34: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q35: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q36: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q37: mode {'tts': 90}; maxPlays {'2': 90}; source {'browser speech synthesis from JSON text': 90}.
- Q38: mode {'dialogue': 90}; maxPlays {'2': 90}; source {'prerecorded MP3 turn src': 360}; turns {'4': 90}; speaker patterns {'female/male/female/male': 54, 'male/female/male/female': 36}; measured duration 24.5/28.18/33.26 seconds, 90/90 within 20-35 seconds, pause setting(s) [400] ms.
- Q39: mode {'dialogue': 90}; maxPlays {'2': 90}; source {'prerecorded MP3 turn src': 360}; turns {'4': 90}; speaker patterns {'male/female/male/female': 45, 'female/male/female/male': 45}; measured duration 22.66/26.95/30.0 seconds, 90/90 within 20-35 seconds, pause setting(s) [400] ms.
- Q40: mode {'dialogue': 90}; maxPlays {'2': 90}; source {'prerecorded MP3 turn src': 360}; turns {'4': 90}; speaker patterns {'female/male/female/male': 46, 'male/female/male/female': 44}; measured duration 24.22/27.06/31.44 seconds, 90/90 within 20-35 seconds, pause setting(s) [400] ms.
Q33 is continuation: the learner selects the natural next utterance. Q38 is topic/purpose, Q39 is detail recall, and Q40 is true/global comprehension. All four currently use four alternating two-speaker turns and prerecorded turn MP3s.

### Image questions

- Q1: one main object image; choose its visible text label.
- Q2: one main action/scene image; choose the matching visible sentence.
- Q10: one main visual, but content varies among charts, object images, vocabulary visuals, and workplace photos; choose a visible interpretation.
- Q23-Q27: hear a word/short expression, then choose one of four image options.
- Q34-Q37: hear a time/number/price/location/action utterance, then choose one of four image options.
- Notices, schedules, signs, tables, and workplace documents also occur as visible text/passages, especially Q7, Q9, Q19, and some Q10 visuals; these are not consistently encoded as separate media types.

### Duplicate, repetition, and answer-position audit

- Q1: exact groups 3 (7 sets); near groups 5 (12 sets); answer indexes 0/1/2/3 = 19/22/19/30.
- Q2: exact groups 0 (0 sets); near groups 10 (25 sets); answer indexes 0/1/2/3 = 20/26/21/23.
- Q3: exact groups 2 (4 sets); near groups 2 (6 sets); answer indexes 0/1/2/3 = 20/22/14/34.
- Q4: exact groups 4 (9 sets); near groups 6 (22 sets); answer indexes 0/1/2/3 = 15/19/33/23.
- Q5: exact groups 2 (6 sets); near groups 4 (9 sets); answer indexes 0/1/2/3 = 20/27/25/18.
- Q6: exact groups 1 (2 sets); near groups 3 (8 sets); answer indexes 0/1/2/3 = 19/24/24/23.
- Q7: exact groups 2 (4 sets); near groups 5 (15 sets); answer indexes 0/1/2/3 = 25/22/18/25.
- Q8: exact groups 4 (10 sets); near groups 8 (25 sets); answer indexes 0/1/2/3 = 17/21/31/21.
- Q9: exact groups 1 (2 sets); near groups 9 (26 sets); answer indexes 0/1/2/3 = 16/29/21/24.
- Q10: exact groups 4 (10 sets); near groups 2 (4 sets); answer indexes 0/1/2/3 = 24/20/24/22.
- Q11: exact groups 0 (0 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 22/23/23/22.
- Q12: exact groups 0 (0 sets); near groups 2 (4 sets); answer indexes 0/1/2/3 = 22/22/23/23.
- Q13: exact groups 0 (0 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 23/22/22/23.
- Q14: exact groups 0 (0 sets); near groups 5 (10 sets); answer indexes 0/1/2/3 = 23/23/22/22.
- Q15: exact groups 0 (0 sets); near groups 3 (6 sets); answer indexes 0/1/2/3 = 22/23/23/22.
- Q16: exact groups 0 (0 sets); near groups 4 (8 sets); answer indexes 0/1/2/3 = 22/22/23/23.
- Q17: exact groups 1 (2 sets); near groups 14 (42 sets); answer indexes 0/1/2/3 = 16/30/20/24.
- Q18: exact groups 0 (0 sets); near groups 5 (37 sets); answer indexes 0/1/2/3 = 27/29/15/19.
- Q19: exact groups 0 (0 sets); near groups 4 (26 sets); answer indexes 0/1/2/3 = 17/23/23/27.
- Q20: exact groups 0 (0 sets); near groups 10 (54 sets); answer indexes 0/1/2/3 = 17/24/22/27.
- Q21: exact groups 0 (0 sets); near groups 8 (21 sets); answer indexes 0/1/2/3 = 30/18/23/19.
- Q22: exact groups 0 (0 sets); near groups 12 (32 sets); answer indexes 0/1/2/3 = 16/19/30/25.
- Q23: exact groups 3 (6 sets); near groups 10 (43 sets); answer indexes 0/1/2/3 = 22/20/22/26.
- Q24: exact groups 0 (0 sets); near groups 10 (43 sets); answer indexes 0/1/2/3 = 28/24/20/18.
- Q25: exact groups 0 (0 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 24/27/22/17.
- Q26: exact groups 1 (2 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 27/20/20/23.
- Q27: exact groups 1 (2 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 28/23/19/20.
- Q28: exact groups 2 (4 sets); near groups 3 (24 sets); answer indexes 0/1/2/3 = 19/20/28/23.
- Q29: exact groups 1 (2 sets); near groups 8 (31 sets); answer indexes 0/1/2/3 = 27/21/20/22.
- Q30: exact groups 1 (2 sets); near groups 7 (28 sets); answer indexes 0/1/2/3 = 23/20/29/18.
- Q31: exact groups 2 (4 sets); near groups 7 (32 sets); answer indexes 0/1/2/3 = 21/28/20/21.
- Q32: exact groups 2 (4 sets); near groups 7 (21 sets); answer indexes 0/1/2/3 = 20/28/21/21.
- Q33: exact groups 10 (87 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 90/0/0/0.
- Q34: exact groups 2 (4 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 22/23/22/23.
- Q35: exact groups 0 (0 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 23/21/28/18.
- Q36: exact groups 1 (2 sets); near groups 8 (41 sets); answer indexes 0/1/2/3 = 17/20/24/29.
- Q37: exact groups 0 (0 sets); near groups 10 (45 sets); answer indexes 0/1/2/3 = 18/29/24/19.
- Q38: exact groups 10 (86 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 89/1/0/0.
- Q39: exact groups 10 (88 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 18/44/28/0.
- Q40: exact groups 10 (87 sets); near groups 0 (0 sets); answer indexes 0/1/2/3 = 0/37/53/0.
Identical option-array, repeated-passage, and repeated-dialogue groups are recorded separately under each question's `duplicates` object in the detailed JSON; image options are compared by file-content hash and Q28-Q32 use their spoken `optionsAudio` values.

Dialogue banks are the clearest repetition problem: Q33/Q38/Q39/Q40 have only a small number of distinct semantic signatures across 90 sets. Their correct-answer positions are also strongly fixed/skewed. Detailed affected-set groups are in the JSON reports.

### Medium versus hard

Length alone does not establish difficulty. For reading, medium items use familiar language, one explicit clue, and clearly different distractors; hard items add workplace-specific vocabulary, denser syntax, inference, negation/sequence, multiple details, or closely plausible distractors. For listening, medium items are short and explicit with one salient detail; hard items use competing details, indirect intent/inference, similar-sounding or plausible distractors, and more information retained across turns. Each question's JSON entry records these criteria separately.

## RECOMMENDED STANDARD

These are recommendations based on the observed structure and usable EPS-TOPIK-style UX; they are not descriptions of current compliance.

- Q1: question_chars 10-30, option_chars 2-12, image one clear main image. Change the image subject/scene, target vocabulary, distractors, option order, and correct-answer position; keep the intended visual task stable.
- Q2: question_chars 10-35, option_chars 10-40, image one unambiguous action/scene image. Change the image subject/scene, target vocabulary, distractors, option order, and correct-answer position; keep the intended visual task stable.
- Q3: question_chars 10-35, context_chars 5-45, option_chars 1-18. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q4: question_chars 10-35, option_chars 12-50. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q5: question_chars 10-35, option_chars 2-35. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q6: question_chars 10-35, option_chars 2-35. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q7: question_chars 10-35, option_chars 2-35. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q8: question_chars 10-35, option_chars 2-35. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q9: question_chars 10-35, option_chars 2-35. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q10: question_chars 10-35, option_chars 5-45, image one legible chart/photo/object image. Change the image subject/scene, target vocabulary, distractors, option order, and correct-answer position; keep the intended visual task stable.
- Q11: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q12: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q13: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q14: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q15: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q16: question_chars 10-35, context_chars 40-110, context_visual_lines 2-4, option_chars 2-25. Change workplace, task, equipment, sentence wording, blank target, distractors, option order, and answer position; avoid reusing one sentence template with substitutions only.
- Q17: question_chars 10-35, context_chars 25-80, option_chars 2-15. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q18: question_chars 10-35, context_chars 50-160, option_chars 12-65. Change passage/document topic, names, workplace, numbers/times/dates, inference/detail target, distractors, option order, and answer position.
- Q19: question_chars 10-35, context_chars 50-190, option_chars 12-70. Change passage/document topic, names, workplace, numbers/times/dates, inference/detail target, distractors, option order, and answer position.
- Q20: question_chars 10-35, context_chars 100-300, option_chars 12-80. Change passage/document topic, names, workplace, numbers/times/dates, inference/detail target, distractors, option order, and answer position.
- Q21: spoken_chars 2-15, option_chars 2-15. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q22: spoken_chars 2-15, option_chars 2-15. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q23: spoken_chars 2-25, image_options 4. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q24: spoken_chars 2-25, image_options 4. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q25: spoken_chars 2-25, image_options 4. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q26: spoken_chars 2-25, image_options 4. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q27: spoken_chars 2-25, image_options 4. Change spoken vocabulary/category, voice realization, image/text distractors, option order, and answer position; neighboring slots should not be interchangeable clones.
- Q28: spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4. Change communicative function, speaker wording, context, all spoken responses, option order, and answer position; do not reuse empty visible option arrays as the semantic comparison source.
- Q29: spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4. Change communicative function, speaker wording, context, all spoken responses, option order, and answer position; do not reuse empty visible option arrays as the semantic comparison source.
- Q30: spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4. Change communicative function, speaker wording, context, all spoken responses, option order, and answer position; do not reuse empty visible option arrays as the semantic comparison source.
- Q31: spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4. Change communicative function, speaker wording, context, all spoken responses, option order, and answer position; do not reuse empty visible option arrays as the semantic comparison source.
- Q32: spoken_question_chars 8-40, spoken_option_chars 5-35, spoken_options 4. Change communicative function, speaker wording, context, all spoken responses, option order, and answer position; do not reuse empty visible option arrays as the semantic comparison source.
- Q33: dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70. Change workplace/topic, speakers' wording, names, numbers/times/places, conversational progression, distractors, option order, and correct-answer position; avoid cycling a small dialogue bank.
- Q34: spoken_chars 5-50, image_options 4. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q35: spoken_chars 5-50, image_options 4. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q36: spoken_chars 5-50, image_options 4. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q37: spoken_chars 5-50, image_options 4. Change topic, vocabulary, surface wording, distractors, option order, and correct-answer position across sets.
- Q38: dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70. Change workplace/topic, speakers' wording, names, numbers/times/places, conversational progression, distractors, option order, and correct-answer position; avoid cycling a small dialogue bank.
- Q39: dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70. Change workplace/topic, speakers' wording, names, numbers/times/places, conversational progression, distractors, option order, and correct-answer position; avoid cycling a small dialogue bank.
- Q40: dialogue_duration_seconds 20-35, dialogue_turns 4, turn_chars 8-60, option_chars 5-70. Change workplace/topic, speakers' wording, names, numbers/times/places, conversational progression, distractors, option order, and correct-answer position; avoid cycling a small dialogue bank.

## Structural findings

The issue report contains 1604 issue records. Counts: DUPLICATE=436, INSUFFICIENT_VARIATION=4, NEAR_DUPLICATE=925, PATTERN_MISMATCH=235, UNBALANCED_ANSWER_POSITION=4.
The main structural inconsistencies are mixed JSON type families at Q2-Q10/Q17/Q19/Q37, highly repetitive dialogue banks, and strongly unbalanced answer positions in Q33/Q38/Q39/Q40. No option-count problem was found. All measured dialogue audio is within 20-35 seconds, and all Q11-Q16 contexts are approximately 2-4 lines at the audited desktop width.
