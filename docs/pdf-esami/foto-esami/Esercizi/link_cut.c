#include <stdio.h>
#include <stdlib.h>

typedef struct node {
              int value;
              struct node * next;
} nodo;
typedef nodo* link;

link cut(link head, int begin, int end);
void printList(link head);

int main() {

    /* Create a small list of nums */
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

    printList(head);
    head = cut(head, 0, 5);
    printList(head);

    return 0;
}


/* La funzione deve restituire, se possibile, la sotto-lista compresa tra le posizioni begin e end deallocando la rimanente parte. */
link cut(link head, int begin, int end) {
    link prev;
    link cur = head;
    link tmp;
    int i = 0;

    if(begin > end) {
        printf("Range start can't exceed end.\n");
        return head;
    }

    if (!head) {
        printf("Head is null.\n");
        return head;
    }

    while(cur != NULL && i < begin) {
        head = head->next;
        free(cur);
        cur = head;
        i++;
    }

    while(cur != NULL && i <= end) {
        tmp = cur;
        cur = cur->next;
        i++;
    }

    while(cur != NULL) {
        prev = cur;
        cur = cur->next;
        free(prev);
    }

    tmp->next = NULL;

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
