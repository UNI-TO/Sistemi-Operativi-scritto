#include <stdio.h>
#include <stdlib.h>

struct record {
int *data;
int length;
};

int erase_record_sum(struct record *recordings[], int n, int sum);


int main() {
    int deleted = 0;

    /* Create the struct array to pass to the function here*/
    struct record *records[3];
    records[0] = malloc(sizeof(struct record));
    records[0]->data = malloc(sizeof(int) * 3);
    records[0]->data[0] = 1;
    records[0]->data[1] = 2;
    records[0]->data[2] = 3;
    records[0]->length = 3;

    records[1] = malloc(sizeof(struct record));
    records[1]->data = malloc(sizeof(int) * 3);
    records[1]->data[0] = 4;
    records[1]->data[1] = 5;
    records[1]->data[2] = 6;
    records[1]->length = 3;

    records[2] = malloc(sizeof(struct record));
    records[2]->data = malloc(sizeof(int) * 3);
    records[2]->data[0] = 7;
    records[2]->data[1] = 8;
    records[2]->data[2] = 9;
    records[2]->length = 3;

    /* call function here */
    deleted = erase_record_sum(records, 3, 8);
    printf("Number of deleted records: %d", deleted);

    /* free memory */
    int i;
    for(i = 0; i < 3; i++) {
        if(records[i]->length != 0) {
            free(records[i]->data);
            free(records[i]);
        }
    }
    return 0;
}



int erase_record_sum(struct record *recordings[], int n, int sum) {
    int deleted = 0;
    int i, j, interimsum;

    for(i = 0; i < n; i++) {
        interimsum = 0;
        for(j = 0; j < recordings[i]->length; j++) {
            interimsum += recordings[i]->data[j];
        } 
        if(interimsum > sum && recordings[i]->length != 0) {
        recordings[i]->length = 0;
        free(recordings[i]->data);
        free(recordings[i]);
        deleted++;
        }
    }
    return deleted;
}
