#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <time.h>

/* TRUE OR FALSE INTS */
#define TRUE 1
#define FALSE 0

int range_of_even(int *nums, int length, int *a, int *b);

int main() {
    int length = 15;
    int *nums = malloc(length * sizeof(int));
    int a, b, i, result;

    srand(time(NULL));

    for (i = 0; i < length; i++) {
        nums[i] = rand() % 100; 
    }
    result = range_of_even(nums, length, &a, &b);

    if (result == TRUE) {
        printf("The range of even numbers are %d to %d", a, b);
    } else {
        printf("There are no even numbers in the array");
    }

    return 0;
}

int range_of_even(int *nums, int length, int *a, int *b) {
    int i = 0;
    int maxNum = INT_MIN;
    int minNum = INT_MAX;

    for(i = 0; i < length; i++) {
        if(nums[i] % 2 == 0) {
            if(nums[i] > maxNum) {
                maxNum = nums[i];
            } else if(nums[i] < minNum) {
                minNum = nums[i];
            }
        }
    }

    if(maxNum != INT_MIN && minNum != INT_MAX) {
        *a = minNum;
        *b = maxNum;
        return TRUE;
    }

    return FALSE;
}