---
layout: post
title: My journey with Debian
description: This is where *FOSS* entered my life !!
date: 2019-09-02 11:11:00 +0500
img: debian.jpg
---

<b>The journey with Debian was and still is a surprise for me, which I never expected to be this fulfilling. </b>
<p>It all started with a mistake, when one day I accidentally formatted my laptop  in which windows and Linux were in dual boot. It was the time when I started reading Kushal Das' book," Linux for you and me" and wondered what I wanted to do and what could I do as a computer science undergraduate!!<br> 
I wanted something different, and out of the box. In the overrated world of machine learning, data science and cybersecurity, open-source was something that lured me in through which I thought I could make a real impact into the world.</p>
<p><u>There was a time when my brain buffer was exceeding my RAM limit</u> :P</p>
<p>So, basically there were two instances that I still remember, one was repairing my laptop and make it bootable again, which was pretty hectic work. I remember that I almost cried, and it is pretty much hilarious to say, I made my /swap partition to 10gib, and one of my friend who was helping me with the process almost laughed, and I was like where did I go wrong?
That was the time I started learning about how things work and what the architecture was all about.
I installed Linux Mint as a newbie (<u>still a newbie</u> :P) and then finally switched to Debian as using docker inside mint, was making me frustrated.</p>
<p>My second incident came at GSoC. I applied for package transition in rails, where I talked to<b> Srud</b> for the very first time. She gave me a task, basically a build failure, but I was just clueless, and ended up at nothing, but that was the time I showed myself at IRC, and I messaged Utkarsh, "I'm done with ruby stuff, I want to learn how the packages are packaged ! :P"
<b>Utkarsh</b> is a friend who is like a mentor to me who helped me a lot and is still helping me. He made me join IRC and added me in all the Debian groups, #debian-ruby, #debian-diaspora, and others.
<br>Later I met my second mentor 
<b>Pirate Praveen</b>
(I'm always fascinated by the pirate thingy; is he dealing with the ships? :O), started exploring all the Debian and packaging documentation. I was introduced to all the resources on the Debian wiki. I kinda liked doing all the configuration, and mostly the part where I converted Debian to unstable mode. "<u>$ sudo apt dist-upgrade</u>" took a hell lot of my patience and time. From that day till today I have installed Debian and made it unstable three times, LOL. I downloaded all the package needed to start packaging (git-buildpackage, sbuild, quilt, devscripts).</p>
<p>
Finally after configuring, Praveen gave me <b>heroku-deflator</b> (<u>my first gem to package</u>). He helped me with a lot of things. I was very comfortable with Utkarsh (having a friend who is DM helped me a lot, whenever I stuck, I just have to message him and my hacker friend helped me with everything), and that was the one of my counter productive night. I learned how things were actually working, why and what commands were doing, how the debian directory was created, and learned to update the debian/* files. Initial package given to me had no build failure and I literally enjoyed it, but trust me after sometimes, you will love to solve these build and other's errors, as it gives something constructive. Also, very much needed to mention, I did it a hell lot of silly mistakes and still struggling with git thingy.
After a month, Praveen said,<u> "Now you should go for a level bump!"</u>, and I panicked (a bad trait of mine), but eventually I started solving minute errors, and started writing patches.<br> I still love $<u>dpkg-source –commit</u>, instead of writing a patch using $<u>quilt</u>. And finally, a week before, I messaged him, "<u>Hey, I want to go with a little bump in the level, I did ruby-combustion version update, a day before yesterday, can you please guide me where to start from and which gem to take.</u>" </p>
And, he started giving me some failures and Utkarsh gave me ruby-combustion as my first package version update work. Thanks for helping me with that. I'm finally working on the failures and other packages given by Praveen.
And, I'm enjoying it! It sometimes makes me frustrated too, but I get to  learn and explore various things, and it's super exciting when the build passes.<br>
<br>I would like to thank <b><u>Debian</u></b> along with my mentors <u>Praveen and Utkarsh</u>, for helping me with a lot of stuff. Thanks for making things easy for me, and I'm overwhelmed with the open-source, and love contributing to it.
Truly, speaking I don't know, if I'll be able to make it to <u><b>MiniDebConf Goa 2k19</b></u>. Hoping that everything goes in place and ends well.
<br>
<br>
`echo "Adieu, till next!!"`
