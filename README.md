## Why Node Cluster
-------------------------------

A single instance of Node.js runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node.js processes to handle the load.
The cluster module allows you to easily create child processes that all share server ports.


Basically it is used to increase performance of the node applications.The elegant solution Node.js provides for scaling up the applications is to split a single process into multiple processes or workers, in Node.js terminology sharing the same port.

## How it works
-------------------------------

A cluster is a pool of similar workers running under a parent Node process. Workers are spawned using the fork() method.This means workers can share server handles and use `IPC (Inter-process communication) to communicate with the parent Node process`.We can create an arbitrary number of workers in your master process.By default incoming connections are distributed in a `round-robin approach among workers` (except in Windows). 	


## Node Cluster Module Examples
-------------------------------

This repo contains several examples on how Node.js cluster module can be used to increase performance of Node applications.

To clone this repo in your machine:

```
git clone https://github.com/shubhangibansal/nodeCluster.git
```

Then, to download all the requirements:

```
npm install
```

Here is a list of all the examples in this repo:

1. `workerfork1.js`: example of fork() event
2. `simple2.js`: contains a simple use of cluster module
3. `onlineEvent.js`: demonstrates the difference between fork() event and online event
4. `messageEvent3.js`: showcasing how exactly the messages are exchanged between the master and worker processes
5. `listeningEvent.js`: showing how the server and the Master process both listens when listen() is called
6. `eventKill4.js`:  example to show how the processes are killed and what happens exactly thereafter
7. `eventdisconnect5.js`: demonstrates how the process gets diconnected and dies gracefully
