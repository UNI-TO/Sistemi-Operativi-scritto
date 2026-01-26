#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;


int delete_after(link head, int after);


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
    result = delete_after(head, 4);
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    return 0;
}

int delete_after(link head, int after) {
    link cur = head;
    link tmp = NULL;
    int i = 1;

    while(cur != NULL && i != after) {
        cur = cur->next;
        i++;
    }
    if(!cur) return FALSE;

    if(cur->next == NULL) {
        return FALSE;
    } else {
        tmp = cur->next;
        cur->next = tmp->next;
        free(tmp);
    }

    return TRUE;

}