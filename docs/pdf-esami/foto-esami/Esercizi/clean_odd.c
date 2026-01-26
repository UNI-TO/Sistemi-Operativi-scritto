#include <stdio.h>
#include <stdlib.h>

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;

link clean_odd(link head);
void printList(link head);

int main() {
    srand(4824230);
    link head = NULL;
    link x;
    int i;
    for(i = 0; i < 10; i++) {
        x = malloc(sizeof(*x));
        x->value = rand() % 100;
        x->next = head;
        head = x;
    }
    printList(head);
    head = clean_odd(head);
    printList(head);
    printf("\n");

    return 0;
}

link clean_odd(link head) {
    link cur = NULL;
    link tmp = NULL;

    if(!head) return NULL;

    while(head != NULL && head->value % 2 != 0) {
        tmp = head;
        head = head->next;
        free(tmp);
    }
    cur = head;

    while(cur != NULL && cur->next != NULL) {
        if(cur->next->value % 2 != 0) {
            tmp = cur->next;
            cur->next = cur->next->next;
            free(tmp);
        } else {
            cur = cur->next;
        }
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