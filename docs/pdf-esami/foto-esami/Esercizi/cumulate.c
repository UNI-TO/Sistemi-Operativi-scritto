#include <stdio.h>
#include <stdlib.h>

int *cumulate(int * a, const int a_length);

int main() {
    int i;
    const int a_length = 6;
    int a[] = {6, 0, 50, 3, 34, 99};
    int *c;


    c = cumulate(a, a_length);

    for(i = 0; i < a_length; i++) {
        printf("%d ", c[i]);
    }
    printf("\n");

    free(c);
    return 0;
}

int *cumulate(int *a, const int a_length) {
    int *new = malloc(sizeof(int) * a_length);
    int i, j, sum;

    for(i = 0; i < a_length; i++) {
        sum = 0;
        for(j = 0; j <= i && j <= a_length-1; j++) {
            sum += a[j];
        }
        new[i] = sum;
    }


    return new;
}