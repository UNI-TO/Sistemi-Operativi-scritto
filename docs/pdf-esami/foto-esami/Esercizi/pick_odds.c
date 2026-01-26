#include <stdio.h>
#include <stdlib.h>

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;

link pick_odds(link head);
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
    head = pick_odds(head);
    printList(head);
    printf("\n");
    return 0;
}

link pick_odds(link head) {
    link cur = head;
    link new = NULL;
    link tmp = NULL;
    int i = 1;

    if(head == NULL) 
        return NULL; 

    while(cur != NULL) {
        if(i % 2 != 0) {
            if(new == NULL) {
                new = malloc(sizeof(*new));
                new->value = cur->value;
                new->next = NULL;
                tmp = new;
            } else {
                tmp->next = malloc(sizeof(*tmp));
                tmp = tmp->next;
                tmp->value = cur->value;
                tmp->next = NULL;
            }
        }
        cur = cur->next;
        i++;
    }
    return new;
}



void printList(link head) {
    link cur = head;
    while (cur != NULL) {
        printf("%d ", cur->value);
        cur = cur->next;
    }
    printf("\n");
}