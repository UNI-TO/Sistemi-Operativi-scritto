#include <stdio.h>
#include <stdlib.h>

struct record {
    int *data;
    int length;
};

int * find_record(struct record recordings[], int n, int value);

int main() {
    int *foundptr;
    /* generate random recordings of struct sample (array)*/
    struct record recordings[10];
    int i;
    for(i = 0; i < 10; i++) {
        recordings[i].data = malloc(sizeof(int));
        *recordings[i].data = rand() % 100;
        recordings[i].length = rand() % 100;
    }

    foundptr = find_record(recordings, 10, 73);

    printf("Pointer to found value: %p", foundptr);
    printf(" (index: %d) ", (int)(foundptr - recordings[0].data));

    for(i = 0; i < 10; i++) {
        free(recordings[i].data);
    }


    return 0;
}

int *find_record(struct record recordings[], int n, int value) {
    int  i;
    int *pos = NULL;

    for(i = 0; i < n; i++) {
        if(*recordings[i].data == value) {
            pos = recordings[i].data;
            break;  
        }
    }

    return pos;
}