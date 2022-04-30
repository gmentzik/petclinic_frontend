// GENERIC UTIL METHODS

// When converting text to Small Caps (via the CSS font-variant directive), Greek
// accented letters should be converted to the respective non-accented uppercase
// letters. The required conversions are the following (in Unicode):
// ά -> Α
// έ -> Ε
// ή -> Η
// ί -> Ι
// ΐ -> Ϊ
// ό -> Ο
// ύ -> Υ
// ΰ -> Ϋ
// ώ -> Ω

// Also diphthongs (two-vowel constructs) should be converted as follows, when the
// first vowel is accented:
// άι -> ΑΪ
// έι -> ΕΪ
// όι -> ΟΪ
// ύι -> ΥΪ
// άυ -> ΑΫ
// έυ -> ΕΫ
// ήυ -> ΗΫ
// όυ -> ΟΫ    

const greekReplacements = {
    "άι": "ΑΪ",
    "έι": "ΕΪ",
    "όι": "ΟΪ",
    "ύι": "ΥΪ",
    "άυ": "ΑΫ",
    "έυ": "ΕΫ",
    "ήυ": "ΗΫ",
    "όυ": "ΟΫ",
    "ά": "Α",
    "έ": "Ε",
    "ή": "Η",
    "ί": "Ι",
    "ΐ": "Ϊ",
    "ό": "Ο",
    "ύ": "Υ",
    "ΰ": "Ϋ",
    "ώ": "Ω"
}

export const convertSmallGreekWithAccentToUppercase = (input: string): string => {
    let result = input;
    Object.entries(greekReplacements).forEach(([key, value]) => {
        result = result.replaceAll(key, value);
    });
    return result.toUpperCase();
}