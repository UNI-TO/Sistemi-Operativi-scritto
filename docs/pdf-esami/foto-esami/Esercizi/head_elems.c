#include <stdio.h>
#include <stdlib.h>

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;


link head_elems(link head, int cut_value);
void printList(link head);

int main() {
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
    head = head_elems(head, 23);
    for(x = head; x != NULL; x = x->next) {
        printf("%d ", x->value);
    }
    printf("\n");
    return 0;
}

link head_elems(link head, int cut_value) {
    link cur = head;
    link tmp = NULL;

    if(!head) return NULL;

    while(cur != NULL && cur->value != cut_value) {
        cur = cur->next;
    }
    if(!cur) return head;

    tmp = cur->next;
    cur->next = NULL;
    while(tmp != NULL) {
        cur = tmp;
        tmp = tmp->next;
        free(cur);
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