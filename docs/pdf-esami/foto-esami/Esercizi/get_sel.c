#include <stdio.h>
#include <stdlib.h>


char * get_sel(char * s, char sel);

int main() {

    char string[] = "Italia Italia";
    char sel = 'i';

    char *substring = get_sel(string, sel);

    printf("Substring is: %s\n", substring);

    return 0;
}


char *get_sel(char *s, char sel) {
    int pos1 = -1, pos2 = -1;
    char *ret;
    int i, j;
    int distance = -1;

    for(i = 0; s[i] != '\0'; i++) {
        if(s[i] == sel) {
            if(pos1 < 0) pos1 = i;
            else if(pos2 < 0) pos2 = i;
        }
    }

    if(pos1 != -1) {
        if(pos2 == -1) {
            distance = i - distance;
        } 
        else {
            distance = pos2 - pos1;
        }
    }

    printf("Distance is: %d\n", distance);

    ret = malloc(distance * sizeof(char) + 1);
    ret[distance+1] = '\0'; 
    for(i = pos1, j = 0; i < pos2; i++, j++) {
        ret[j] = s[i];
    }
    
    return ret;
}

