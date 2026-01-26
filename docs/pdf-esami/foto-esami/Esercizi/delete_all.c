#include <stdlib.h>
#include <stdio.h>

#define TRUE 1
#define FALSE 0


typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;

int delete_all(link head, int to_delete);

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
    result = delete_all(head, 10);
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    return 0;
}

int delete_all(link head, int to_delete) {
    link cur = head;
    link prev = NULL;

    if(!head || head->value == to_delete ) return FALSE;

    while(cur->next != NULL && cur != NULL) {
        if(cur->next->value == to_delete) {
            prev = cur->next;
            cur->next = cur->next->next;
            free(prev);
        } else {
            cur = cur->next;
        }
    }

    return TRUE;
}