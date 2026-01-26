#include <stdio.h>
#include <stdlib.h>


typedef struct node {
        int value;
        struct node * next;
} nodo;
typedef nodo* link;

link roll(link head);
void printList(link head);

int main() {

    link head = malloc(sizeof(nodo));
    head->value = 1;
    head->next = malloc(sizeof(nodo));
    head->next->value = 2;
    head->next->next = malloc(sizeof(nodo));
    head->next->next->value = 3;
    head->next->next->next = malloc(sizeof(nodo));
    head->next->next->next->value = 4;
    head->next->next->next->next = malloc(sizeof(nodo));
    head->next->next->next->next->value = 5;
    head->next->next->next->next->next = NULL;
    printList(head);

    link test = roll(head);
    printList(test);

    return 0;
}
link roll(link head) {
    link cur = head;
    link tmp = head;

    while(cur->next != NULL) {
        cur = cur->next;
    }
    cur->next = tmp;
    head = head->next;
    tmp->next = NULL;

    return head;
}
void printList(link head) {
    link cur = head;
    while(cur != NULL) {
        printf("%d ", cur->value);
        cur = cur->next;
    }
    printf("\n");
}