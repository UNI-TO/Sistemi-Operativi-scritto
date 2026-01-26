#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;


int add_after(link head, int to_add, int after);


int main() {
    link head = malloc(sizeof(nodo));
    link current = head;
    int result;
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
    result = add_after(head, 83, 0);
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    return 0;
}

int add_after(link head, int to_add, int after) {
    link cur = head;
    link tmp = NULL;

    while(cur != NULL && cur->value != after) {
        cur = cur->next;
    }
    if(!cur) return FALSE;

    if(cur->next == NULL) {
        cur->next = malloc(sizeof(nodo));
        cur = cur->next;
        cur->value = to_add;
        cur->next = NULL;
    } else {
        tmp = cur->next;
        cur->next = malloc(sizeof(nodo));
        cur = cur->next;
        cur->value = to_add;
        cur->next = tmp;
        
    }
    return TRUE;
}