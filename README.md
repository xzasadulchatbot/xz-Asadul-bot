# xz-Asadul-bot
Custom Messenger Bot powered by Cookie Login
---------

###  Xz Asadul chat bot🌺
❖ **`A Massanger  Multi Device Bot To Take Your Massanger To Another Level !`** ❖

----------
## CLICK <a xz Asadul chat bot


<img src='https://i.imgur.com/UNIhrjs.jpeg'/>

-------

 <p align="center">
  <a href="#"><img src="http://readme-typing-svg.herokuapp.com?color=cyan&center=true&vCenter=true&multiline=false&lines=`xz+Asadul+chat+bot`" alt="">

<br>

--------

<p align="center">
<a href="https://github.com/cyber-ullash/"><img title="Followers" src="https://img.shields.io/github/followers/cyber-ullash?color=blue&style=flat-square"></a>
<a href="https://github.com/cyber-ullash/CYBER-BOT-COMMUNITY/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/cyber-ullash/CYBER-BOT-COMMUNITY/?color=blue&style=flat-square"></a>
<a href="https://github.com/cyber-ullash/CYBER-BOT-COMMUNITY/network/members"><img title="Forks" src="https://img.shields.io/github/forks/cyber-ullash/CYBER-BOT-COMMUNITY?color=blue&style=flat-square"></a>
<a href="https://github.com/cyber-ullash/CYBER-BOT-COMMUNITY/"><img title="Size" src="https://img.shields.io/github/repo-size/cyber-ullash/CYBER-BOT-COMMUNITY?style=flat-square&color=blue"></a>
<a href="https://github.com/cyber-ullash/CYBER-BOT-COMMUNITY/graphs/commit-activity"><img height="20" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"></a>&nbsp;&nbsp;
</p>
<p align='center'>
</p>

-----------
<div align="center"><br> <img src="https://profile-counter.glitch.me/SILENT-SOBX-MD/count.svg" /><br xz Asadul chat bot</div>

------------

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>
<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

### <br>   ❖ DEPLOY_WORKFLOWS ❖
```
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    # Step to check out the repository code
    - uses: actions/checkout@v2

    # Step to set up the specified Node.js version
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}

    # Step to install dependencies
    - name: Install dependencies
      run: npm install

    # Step to run the bot with the correct port
    - name: Start the bot
      env:
        PORT: 8080
      run: npm start
