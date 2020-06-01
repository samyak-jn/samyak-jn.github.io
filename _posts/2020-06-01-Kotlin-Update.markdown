---
layout: post
title: Kotlin Update!
description: The one with Kotlin future :)
date: 2020-06-01 15:00:00 +0500
img: Kotlin_deb.png
tags: [Open-source, GSoC, Debian]
---

### A Quick Recap from last year:

**Kotlin** is being packaged under the Google Summer of Code within the Debian organization itself. The major reason behind bringing Kotlin in Debian is to update all the Android packages which are now heavily dependent upon the Kotlin libraries.

The major work to bring Kotlin into Debian is done for the version 1.3.30, by *Saif Abdul Cassim* (goes by *m36* on IRC) as a part of his GSoC'2019.
All his contributions to the team can be found in [his blog posts](https://java-team.pages.debian.net/gsoc-kotlin-blog/).

So, for now, we have a bootstrap package and a Kotlin package for the version with 1.3.30.
There were still changes needed as we lacked some of the dependencies for Kotlin, and the source package lacked copyright information and didn’t comply with Debian standards.

### What's the present year brought for Kotlin?

To be specific the following were mainly left dependencies for Kotlin:

 * JLine3
 * intellij-community-idea
 * kotlin-bootstrap

And, we lack documentation for the newbies in order to get them started :(

Most importantly the crucial part was and still is, to figure out how to upload the package?

For GSoC'*20*, three students are selected as a part of project **Android SDK tools in Debian**.

####  What's the work done/left?

**Work Done**

* A couple of dependencies were completed and reside in NEW Queue, those include **Jline3** (done by @samyak-jn, myself), and **intellij-community-idea** (finished by @The_LoudSpeaker, Raman Sarda).

* The `kotlin` package residing in m36’s repository had a couple of issues that were needed to be fixed to meet Debian standards, but Kotlin was building fine locally with the mentioned dependencies.  :D

* I (Samyak Jain) took the work for converting all the commits to the *patches* as all the changes were made directly to the source, and henceforth fixed files to meet Debian Standards. Debian is very particular about its license policies. The copyright was a pending task that was completed for Good.
The newer package exists at [Samyak's repo](https://salsa.debian.org/samyak-jn/kotlin).

* I set up an initial wiki page for Kotlin as well, so everyone can follow. Thanks, Hans (@_hc) for the help with that. The wiki page for Kotlin exists [here](https://wiki.debian.org/Kotlin).

**What's Blocking?**

* The most uncertain thing is to decide, how Kotlin will be **uploaded** to the Debian Archive?

**What is the problem being faced?**

The **Kotlin-Bootstrap** package consists of JAR files for various dependencies of kotlin such as Gradle, kotlin compiler, and kotlinx. The package is added to the build-depends of the main package so that the JAR files can be provided. Since the kotlin-bootstrap consists of binaries (JAR files), it is not feasible to upload the package as free software.

The other workaround was the **Gradle 6.4** version, which consists of Kotlin files and generates a suitable JAR. But since the package needed Kotlin language itself, it was never updated, as it created a cyclic dependency.

Final workaround came, which proposed **Kotlin to build from itself**, that was a pretty impressive suggestion. But, we still have to look if the solution is feasible? Because, as far as I last checked and conversed with ebourg on the mailing list [here](https://lists.debian.org/debian-java/2020/05/msg00048.html), Emmanuel Bbourg mentioned very clearly that the *rebuilt package is our interest*. So, this is under WIP.

But, I fail to acknowledge the fact if we can drop the kotlin-bootstrap package totally, Kotlin will not be able to be built because each and every JAR file present in the bootstrap is needed.

That pretty much is the ongoing work and the update on the kotlin package. We intend to bring Kotlin to the Debian Archive as soon as possible  :)

#### Have any queries or suggestions for Kotlin?

Please feel to drop a message at `#debian-mobile` channel on OFTC.

`echo "Adieu, till next!!"`
