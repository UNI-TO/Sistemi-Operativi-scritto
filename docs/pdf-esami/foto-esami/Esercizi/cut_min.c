#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct node {
              int value;
              struct node * next;
} nodo;
typedef nodo* link;

link cut_min(link head);
void printList(link head);

int main() {
    link head = malloc(sizeof(nodo));
    head->value = 10;
    head->next = malloc(sizeof(nodo));
    head->next->value = 1;
    head->next->next = malloc(sizeof(nodo));
    head->next->next->value = 3;
    head->next->next->next = malloc(sizeof(nodo));
    head->next->next->next->value = 4;
    head->next->next->next->next = malloc(sizeof(nodo));
    head->next->next->next->next->value = 5;


    link test = cut_min(head);
    printList(test);

    return 0;
}


link cut_min(link head) {
    link cur = head;
    int smallest = INT_MAX;

    while(cur != NULL) {
        if(cur->value < smallest) smallest = cur->value;
        cur = cur->next;
    }

    cur = head;
    if(head->value == smallest) {
        head = head->next;
        return head;
    }

    while(cur != NULL && cur->next != NULL) {
        if(cur->next->value == smallest) {
            cur->next = cur->next->next;
            return head;
        }
        cur = cur->next;
    }

    return head;
}
void printList(link head) {
    link cur = head;
    while (cur != NULL) {
        printf("%d ", cur->value);
        cur = cur->next;
    }
    printf("\n");
}