#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

int is_balanced(char * str, char **pos);

int main() {
    char input[] = "ab(c))de)fgh";
    char *pos = input;
    int result;

    result = is_balanced(input, &pos);

    if(result == TRUE) printf("balanced\n");
    else printf("not balanced due to char %c\n", *pos);

    return 0;
}

int is_balanced(char *str, char **pos) {
    int i;
    int open = 0;
    int closed = 0;

    for(i = 0; str[i] != '\0'; i++) {
        switch(str[i]) {
            case '(':
                printf("Found an open\n");
                open++;
                break;
            case ')':
                printf("Found a closed\n");
                closed++;
                if(closed > open) {
                    *pos = &str[i];
                    return FALSE;
                }
                break;
            default:
                break;
        }
    }
    if(open == closed) return TRUE;
    else *pos = &str[i-1];

    return FALSE;

}