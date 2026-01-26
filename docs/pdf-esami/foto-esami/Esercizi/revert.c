#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node * next;
} nodo;
typedef nodo* link;

link revert(link head);

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
    head = revert(head);
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    printf(" <- Reverted list of values");
    return 0;
}

link revert(link head) {
    link prev = NULL;
    link cur = head;
    link next = NULL;

    while(cur != NULL) {
        next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;

}