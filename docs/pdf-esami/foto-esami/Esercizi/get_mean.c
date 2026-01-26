#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <limits.h>
#include <math.h>

struct sample { int value; double  time; };

double get_mean(struct sample recordings[], int size);

int main() {
    double mean;
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
    
    mean = get_mean(recordings, 10);
    printf("%f\n", mean);

    return 0;
}

double get_mean(struct sample recordings[], int size) {
    int i;
    double tmp;
    double medians = 0;

    for(i = 0; i < size; i++) {
        tmp = (recordings[i].time + recordings[i].value) / 2;
        printf("median for current loop: %f\n", tmp);
        medians += tmp;
    }

    if(medians == 0) {
        ernno = 256;
        return -1;
    }
    return medians / size;
}