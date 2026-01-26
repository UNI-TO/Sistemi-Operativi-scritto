#include <stdlib.h>
#include <stdio.h>

#define TRUE 1
#define FALSE 0

int verify_vowel(char *string);
int is_vowel(char element);

int main() {
    char *string = "aeizou";
    int result = verify_vowel(string);
    printf("%d ", result);
    return 0;
}

int verify_vowel(char *string) {
    int i = 0;
    while (string[i] != '\0') {
        if (!is_vowel(string[i])) {
            return FALSE;
        }
        i++;
    }

    return TRUE;
}

int is_vowel(char element) {
    if (element == 'a' || element == 'e' || element == 'i' || element == 'o' || element == 'u') {
        return TRUE;
    }
    return FALSE;
}

