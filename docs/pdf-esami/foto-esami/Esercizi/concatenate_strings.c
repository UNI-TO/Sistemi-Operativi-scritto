#include <stdlib.h>
#include <stdio.h>

char * concatenate_strings(char ** v, unsigned int n);

int main() {
    char *v[] = {"ciao", "come", "va", "tu"};
    char *s = concatenate_strings(v, 4);
    printf("%s ", s);
    free(s);
    return 0;
}

char * concatenate_strings(char ** v, unsigned int n) {
    int i, j, k, len = 0;
    char *s;
    /* compute the total length of the string */
    for(i = 0; i < n; i++) {
        for(j = 0; v[i][j] != '\0'; j++) {
            len++;
        }
    }
    /* allocate memory for the string */
    s = malloc((len + 1) * sizeof(char));
    k = 0;
    /* copy the contents of the strings in v into s */
    for(i = 0; i < n; i++) {
        for(j = 0; v[i][j] != '\0'; j++) {
            s[k] = v[i][j];
            k++;
        }
    }
    /* add the null character at the end of s */
    s[k] = '\0';
    return s;
}