#include <stdio.h>
#include <stdlib.h>

int *greater_than(int *a, int *b, const int a_length, const int b_length);


int main() {
    int i;
    const int b_length = 6;
    const int a_length = 3;
    int a[] = {1, 2, 3};
    int b[] = {6, 0, 50, 3, 34, 99};
    int *c;

    /* 
    1 = 5 
    2 = 5
    3 = 4
    */

    c = greater_than(a, b, a_length, b_length);

    for(i = 0; i < a_length; i++) {
        printf("%d ", c[i]);
    }
    printf("\n");

    free(c);
    return 0;
}


int *greater_than(int *a, int *b, const int a_length, const int b_length) {
    int *new = malloc(a_length * sizeof(int));
    int greater;
    int i, j;

    for(i = 0; i < a_length; i++) {
        greater = 0;
        for(j = 0; j < b_length; j++) {
            if(b[j] > a[i]) greater++;
        }
        new[i] = greater;
    }

    return new;
}