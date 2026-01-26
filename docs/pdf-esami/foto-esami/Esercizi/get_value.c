#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <limits.h>
#include <math.h>

struct sample { int value; double  time; };

int get_value(struct sample recordings[], int size, double nearest);

int main() {
    int nearestVal;
    /* generate random recordings of struct sample (array)*/
    struct sample recordings[10];
    int i;
    for(i = 0; i < 10; i++) {
        recordings[i].value = rand() % 100;
        recordings[i].time = (double)rand() / (double)RAND_MAX;
    }

    /* print all structs */
    for(i = 0; i < 10; i++) {
        printf("struct->value: %d, struct->time: %f", recordings[i].value, recordings[i].time);
        printf(" (index: %d) ", i);
        printf("\n");
    }
    
    nearestVal = get_value(recordings, 10, 0.4);
    printf("Nearest time's struct->value is: %d", nearestVal);

    return 0;
}

int get_value(struct sample recordings[], int size, double nearest) {
    double best = INT_MAX;
    double tmp;
    int i, nearestindex = -1;

    for(i = 0; i < size; i++) {
        tmp = fabs(nearest - recordings[i].time);
        if(tmp < best ) {
            best = tmp;
            nearestindex = i;
        }
    }
    printf("Nearest index: %d\n", nearestindex);
    if(nearestindex == -1) errno = 256;

    return recordings[nearestindex].value;
}