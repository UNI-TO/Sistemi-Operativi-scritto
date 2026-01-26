#include <stdio.h>
#include <stdlib.h>

typedef struct node {
              int value;
              struct node * next;
} nodo;
typedef nodo* link;

link insert(link head, link patch, int pos);
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

    link head2 = malloc(sizeof(nodo));
    head2->value = 8;
    head2->next = malloc(sizeof(nodo));
    head2->next->value = 9;


    link test = insert(head, head2, 3);
    printList(test);

    return 0;
}

link insert(link head, link patch, int pos) {
    int i = 0;
    link cur, cur2, tmp;

    if(!head || !patch || pos < 0) return NULL;


    cur = head;
    while(cur != NULL && i < pos) {
        cur = cur->next;
        i++;
    }

    if(i != pos) return NULL;


    cur2 = patch;
    tmp = cur->next;
    cur->next = cur2;

    while(cur2->next != NULL) {
        cur2 = cur2->next;
    }

    cur2->next = tmp;

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