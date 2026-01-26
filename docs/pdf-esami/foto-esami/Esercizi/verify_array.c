#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

int verify_array(int *array1, int size1, int *array2, int size2);
int check_pair(int element, int *array, int size);

int main() {

    int verified;
    int size1 = 8;
    int size2 = 10;
    int arr1[8] = {1, 12, 12, 12, 12, 12, 12, 2};
    int arr2[10] = {4, 4, 4, 4, 4, 4, 4, 4, 4, 4};

    verified = verify_array(arr1, size1, arr2, size2);

    printf("verified is = %d", verified);


    return 0;
}


int verify_array(int *array1, int size1, int *array2, int size2) {
    int i;
    for(i = 0; i < size2; i++) {
        if(!check_pair(array2[i], array1, size1)) return FALSE;
    }

    return TRUE;
}

int check_pair(int element, int *array, int size) {
    int i, j;
    int found = 0;

    for(i = 0; i < size && found == 0; i++) {
        for(j = 0; j < size; j++) {
            if(i == j) continue;
            if((array[i] + array[j]) == element) {
                found = 1;
                break;
            }
        }
    }

    if(found) return TRUE;
    else return FALSE;
}