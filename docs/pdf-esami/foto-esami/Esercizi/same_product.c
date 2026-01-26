#include <stdlib.h>
#include <stdio.h>

#define TRUE 1
#define FALSE 0

int same_product(int *array, int size);

int main() {
    int array[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int result = same_product(array, 10);
    printf("%d ", result);
    return 0;
}

int same_product(int *array, int size) {
    int i = 0;
    int j = size-1;

    while (i < j) {
        if (array[i] * array[j] != array[i+1] * array[j-1]) {
            return FALSE;
        }
        i++;
        j--;
    }

    return TRUE;
}
