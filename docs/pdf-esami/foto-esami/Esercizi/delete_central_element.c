#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;

int delete_central_element(link head);

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
    result = delete_central_element(head);
    current = head;
    while (current != NULL) {
        printf("%d ", current->value);
        current = current->next;
    }
    return 0;
}

int delete_central_element(link head) {
    int nodes = 0;
    int center;
    int pos = 0;
    link cur = head;
    link prev = NULL;
    
    while(cur != NULL) {
        nodes++;
        cur = cur->next;
    }
    cur = head;

    if(nodes < 3) return FALSE;

    if(nodes % 2 == 0){
        /* delete central two elements */
        center = nodes/2;
        while(cur != NULL && cur->next != NULL) {
            if(pos == center) {
                prev->next = cur->next->next;
                free(cur->next);
                free(cur);
                return TRUE;
            }
            prev = cur;
            cur = cur->next;
            pos++;
        }
        
    } else {
        /* delete central */
        center = nodes/2 + 1;
        while(cur != NULL && cur->next != NULL) {
            if(pos == center) {
                prev->next = cur->next;
                free(cur);
                return FALSE;
            }
            prev = cur;
            cur = cur->next;
            pos++;
        }
    }

    return FALSE;
}