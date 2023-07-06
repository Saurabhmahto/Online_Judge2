#include <bits/stdc++.h>
using namespace std;
#define int long long int
#define mod 1000000007
#define print(x) cout << x << endl;
#define MOD1 998244353
#define INF 1e18
#define pb push_back
#define ppb pop_back
#define mp make_pair
#define ff first
#define ss second
#define PI 3.141592653589793238462
#define set_bits __builtin_popcountll
#define sz(x) ((int)(x).size())
#define all(x) (x).begin(), (x).end()
#define fastio()                      \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL)
#define forloop0(n, v)          \
    for (int j = 0; j < n; j++) \
    {                           \
        cin >> v[j];            \
    }
#define forloop1(n, v)           \
    for (int j = 1; j <= n; j++) \
    {                            \
        cin >> v[j];             \
    }
#define cin_input(x) cin >> x
typedef long long ll;
typedef unsigned long long ull;
typedef long double lld;
#ifndef ONLINE_JUDGE
#define debug(x)       \
    cout << #x << ' '; \
    _print(x);         \
    cout << endl;
#else
#define debug(x)
#endif
void _print(int t)
{
    cout << t;
}
void _print(string t) { cout << t; }
void _print(char t) { cout << t; }
void _print(double t) { cout << t; }
template <class T, class V>
void _print(pair<T, V> p);
template <class T>
void _print(vector<T> v);
template <class T>
void _print(set<T> v);
template <class T, class V>
void _print(map<T, V> v);
template <class T>
void _print(multiset<T> v);
template <class T, class V>
void _print(pair<T, V> p)
{
    cout << '{';
    _print(p.ff);
    cout << ',';
    _print(p.ss);
    cout << '}';
}
template <class T>
void _print(vector<T> v)
{
    cout << '[';
    for (T i : v)
    {
        _print(i);
        cout << ' ';
    }
    cout << ']';
}
template <class T>
void _print(set<T> v)
{
    cout << '[';
    for (T i : v)
    {
        _print(i);
        cout << ' ';
    }
    cout << ']';
}
template <class T>
void _print(multiset<T> v)
{
    cout << '[';
    for (T i : v)
    {
        _print(i);
        cout << ' ';
    }
    cout << ']';
}
template <class T, class V>
void _print(map<T, V> v)
{
    cout << '[';
    for (auto i : v)
    {
        _print(i);
        cout << ' ';
    }
    cout << ']';
}
void solve()
{
    int n;
    cin >> n;
    string s;
    cin >> s;
    map<int,int> mpp;
    int cur = -1;
    for (int i = n - 1; i >= 0; i--)
    {
        if (s[i] == ':')
        {
            mpp[i] = cur;
            cur = i;
        }
    }
    int ans=0;
  
    for(auto it:mpp){
        int i=it.first ,j=it.second;
        if(i>=0 && j>=0 && i+1!=j){
            int fl=0;
            for(int k=i+1;k<j;k++){
                if(s[k]!=')'){
                    fl=1;
                }
            }
            if(fl==0)ans++;
        }
    }
    print(ans);
}
int32_t main()
{
    int t;
    cin >> t;
    while (t--)
    {
        for(int i=0;i<10;i++){cout<<"hello<<endl; }
    };
    return 0;
}