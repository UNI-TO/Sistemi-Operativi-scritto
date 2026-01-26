#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct node {
       int value;
       struct node * next;
} nodo;
typedef nodo* link;

link insert_in_middle(link head);

int main() {
    // Initialize list
    link head = (link) malloc(sizeof(nodo));
    head->value = 8;
    link second = (link) malloc(sizeof(nodo));
    second->value = -1;
    head->next = second;
    link third = (link) malloc(sizeof(nodo));
    third->value = 4;
    second->next = third;
    link fourth = (link) malloc(sizeof(nodo));
    fourth->value = -2;
    third->next = fourth;
    fourth->next = head;

    // Insert new node in middle
    link new_node = insert_in_middle(head);

    // Print updated list
    link current = head;
    do {
        printf("%d ", current->value);
        current = current->next;
    } while (current != head);

    return 0;
}


link insert_in_middle(link head) {
    link current = head, prev = head, min_node = head;
    int min_val = INT_MAX, max_val = INT_MIN;

    // Find min and max values and their corresponding nodes
    do {
        if (current->value < min_val) {
            min_val = current->value;
            min_node = current;
        }
        if (current->value > max_val) {
            max_val = current->value;
        }
        prev = current;
        current = current->next;
    } while (current != head);

    // Create new node with value (max+min)/2
    link new_node = (link) malloc(sizeof(nodo));
    new_node->value = (max_val + min_val) / 2;
    new_node->next = min_node->next;

    // Insert new node after min_node
    min_node->next = new_node;

    // If min_node was the last node, update prev->next to point to new node
    if (prev == min_node) {
        prev->next = new_node;
    }

    return new_node;
}