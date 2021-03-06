# E-Voting using BigchainDB


This is an early version of a demonstrator of BigchainDB based architecture.

The data are collected and inserted into the blockchain using a web application written in AngularJS.

The data visualization is provided via web browser using Plotly library.

The plotted graphs are retrieved by querying MongoDB.

The graphic representation is provided through a Node.js application, which makes use of Express.js as a middleware web framework to allow the communication between web browser and database.

The following components are required:
- BigchainDB 2.2.1,
- MongoDB 3.4 or newer,
- Tendermint 0.31.5 ,
- Node.js. 

This demonstrator has been developed using Ubuntu 18.04.

## 1.Backend

### Bigchaindb
To install BigchainDB please follow the steps indicated in [1], avoiding the usage of NGINX.

These are the steps performed to install the version 2.2.1:

1.Installing pip for python3:
```bash

sudo apt install python3-pip
```
2. use pip3 to install bigchaindb

```bash

sudo pip3 install bigchaindb==2.2.1
```
 configure bigchaindb running:
 

```bash

bigchaindb configure
```


### MongoDB
To check if the version in the repository is correct:

```bash

apt-cache policy mongodb
```
After verifying that is the correct one, to install it:
```bash

sudo apt install mongodb
```

To check if mongodb is running:

```bash
systemctl status mongodb
```



### Tendermint 

To install tendermint we also installed unzip.
```bash
sudo apt install unzip
```

then we used wget to download the tendermint zip file.
```bash
unzip tendermint_v0.31.5_linux_amd64.zip
```
mv the directory to /usr/local/bin

```bash
sudo mv tendermint  /usr/local/bin
```
Initialize it with
```bash
tendermint init
```

To allow members to connect each other is fundamental to configure the file config.toml as explained in [1]

### Monit

Monit is used to run and monitor tendermint and bigchaindb. It will restart them if they crashed.

```bash
sudo apt install monit
```

As explained [here](http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/network-setup.html), you will be able to run the bigchaindb-monit-config script, which will be in your PATH. Running the script is required to build a configuration file for Monit:

```bash
bigchaindb-monit-config  
```

To run monit:

```bash
monit -d 1
```

## 2.Frontend

### Data entry: vote choice

Through the page [frontend_vote.html](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/frontend_vote.html), voters make their choice.

The Javascript code shown [here](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/vote_transaction.js) is called inside [frontend_vote.html](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/frontend_vote.html), and through that code the data are inserted in the blockchain in JSON format.


### Graphical visualization

To visualize the data inserted in the blockchain, we used a node.js application installed on one of the nodes.

To install node.js:
```bash
sudo apt install npm
```

These packages are required by our application:

```bash
npm install bigchaindb-driver@4.1.0
npm install base-x@3.0.4
npm install bip39@2.5.0
npm install mongodb@3.0.4
npm install express -–save
npm install jquery
```


The code of our node.js application can be found [here](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/visualization/nodeJS_server.js).


To interact with the node.js application there are 2 Javascripts files, [calculate.js](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/visualization/calculate_mod.js) and [myFunctions.js](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/visualization/myFunctions_mod.js), that are loaded into a [html page](https://github.com/michelescarlato/e-voting_Blockchain/blob/master/visualization/graph_mod.html).

[Here](https://youtu.be/80z4VyEGPhw) there is a video which shows how the interaction with the blockchain occurs, visualizing with a graph the status of the vote. 

## Experiments

In the test directory there are log files collected during the experiments.
Here are some videos where part of the experiments are shown:

10 nodes experiment, configuring and running 10 nodes.
This video shows how 10 nodes are configured, using a bash script that basically sets the moniker in the config.toml file, distributes the genesis.json file on all nodes and runs monit, which is used to run tendermint and bigchainDB, and monitor its running.
[10 nodes configring and running](https://youtu.be/rmdGdgQCL5Q)



10 nodes experiment, running the command monit status to check if bigchaindb and tendermint are running correctly:
[10 nodes monit summary](https://youtu.be/KGfNkDOaj-w)

