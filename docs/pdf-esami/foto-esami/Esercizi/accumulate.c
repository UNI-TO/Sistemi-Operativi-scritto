#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *next;
} nodo;
typedef nodo* link;

void accumulate(link head);

int main() {
    link head = malloc(sizeof(nodo));
    link current = head;
    int i;
    for (i = 0; i < 10; i++) {
        current->value = i;
        current->next = malloc(sizeof(nodo));
        current = current->next;
    }
    current->value = 10;
    current->next = NULL;
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    printf(" <- Original list of values\n");

    accumulate(head);
    
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }

    return 0;
}

void accumulate(link head) {
    int sum = 0;
    link cur = head;

    if(!head) return;

    while(cur != NULL) {
        sum += cur->value;
        cur->value = sum;
        cur = cur->next;
    }
}