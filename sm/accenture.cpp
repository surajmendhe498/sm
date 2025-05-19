#include<bits/stdc++.h>
using namespace std;
int sum(int arr[], int n){
    int sum= 0;

    for(int i=0;i<n; i++){
        if(arr[i]%2 == 0){
           sum+= arr[i];
        }
        
    }
    return sum;
};

int main(){
    int arr[]= {1,2,3,4,5};
    int n= sizeof(arr)/sizeof(arr[0]);

    int result= sum(arr, n);
    cout<<"sum is: "<<result;
}