#include <stdio.h>
#include <stdlib.h>

typedef struct node {
       int val;
       struct node * next;
} nodo;

nodo *top3(nodo *head);

int main() {
    nodo *head = NULL;
    nodo *x;
    int i;
    for(i = 0; i < 50; i++) {
        x = malloc(sizeof(*x));
        x->val = rand() % 100;
        x->next = head;
        head = x;
    }
    for(x = head; x != NULL; x = x->next) {
        printf("%d ", x->val);
    }
    printf("\n");
    head = top3(head);
    for(x = head; x != NULL; x = x->next) {
        printf("%d ", x->val);
    }
    printf("\n");
    return 0;
}

nodo *top3(nodo * head) {
    int i = 0, top1, top2, top3;
    nodo *cur = head;
    nodo *tmp = NULL;

    while(cur != NULL) 
    { 
        i++;
        cur = cur->next;
    }

    if(i <= 3) return head;

    top1 = -99999;
    top2 = top1;
    top3 = top1;
    cur = head;

    while(cur != NULL) {
        if(cur->val > top1) top1 = cur->val;
        cur = cur->next;
    }

    cur = head;
    while(cur != NULL) {
        if(cur->val > top2 && cur->val != top1)top2 = cur->val;

        cur = cur->next;
    }

    cur = head;
    while(cur != NULL) {
        if(cur->val > top3 && (cur->val != top1 && cur->val != top2)) top3 = cur->val;

        cur = cur->next;
    }

    while(head != NULL && head->val != top1 && head->val != top2 && head->val != top3) {
        tmp = head;
        head = head->next;
        free(tmp);
    }

    printf("Top 3 values are: %d %d %d\n", top1, top2, top3);
    cur = head;
    tmp = NULL;
    

    while(cur != NULL && cur->next != NULL) {
        if(cur->next->val != top1 && cur->next->val != top2 && cur->next->val != top3) {
            tmp = cur->next;
            cur->next = cur->next->next;
            free(tmp);
        } 
        else cur = cur->next;
    } 

    return head;
}