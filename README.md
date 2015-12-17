## Node Cluster Module Examples
-------------------------------

This repo contains several examples on how Node.js cluster module can be used to increase performance of Node applications.

To clone this repo in your machine:

```
git clone https://github.com/behroozk/node-cluster-tutorial.git
```

Then, to download all the requirements:

```
npm install
```

Here is a list of all the examples in this repo:

1. `workerfork1.js`: example of fork() event
2. `simple2.js`: contains a simple use of cluster module
3. `messageEvent3.js`: showcasing how exactly the messages are exchanged between the master and worker processes
3. `eventKill4.js`:  example to show how the processes are killed and what happens exactly thereafter
4. `eventdisconnect5.js`: demonstrates how the process gets diconnected and dies gracefully