# Isometry

To a certain extent, writing this README is a fundamental folly. I don't quite know what this is, and in the spirit of exploration— I'm trying to figure out what this is, and what it could be. This is going to be very hand-wavey as I freely conflate interface, implementation, static types and dynamic predicates, library and application, virtue and sin.

### Introduction

Nowadays, no language is complete without a package manager. And many languages have extraordinarily large numbers of packages. Most of them seek to do essentially the same thing as something else. This leads to fragmentation, and the entire ecosystem loses robustness. The classical solution was to design standards, but this has failed: "The great thing about standards is that there are so many to choose from". Instead, let's allow implementations and interfaces to be substituted.



### Interfaces and Types

At the core, it's about notation for representing structural and semantic similarity. 

In a software ecosystem, there's a rampant sense of "not-invented-here", and oftentimes people re-invent useful primitives. Oftentimes without foreknowledge that such a thing has already been done (and also because the existing solutions aren't particularly good). This leads to fragmentation and incompatibility— because nobody can ever standardize on types, type hierarchies, representations, or names. 

But it's often trivial to write functions which map one interface to another. In this case, imagine we have one method which takes two arguments `add` and another function `plus` which is curried.  

	add(x, y) <-> plus(x)(y)

Perhaps `add` expects 64-bit floats as arguments, and perhaps `plus` expects BigIntegers. Usually these conversions are also well defined (though they are sometimes lossy). 

Each of these mappings between one interface and another, and each of these implementations mapping one type to another can be represented as a directed edge in a type graph. Any implementation or interface which is reachable in the equivalence class of some other can be substituted by following the chain of implementations from one to another. 

### Automatic Dispatch

When there are multiple functionally equivalent implementations, we can have different metrics for which implementation is dispatched. We can favor ones which are implemented purely in the host language (i.e. do not need to call out to external libraries or programs), we can favor ones which are written succinctly and clearly, or we can favor ones which run the fastest.

And sometimes using the fastest may even involve switching representations. Lets say `n` is a (large) vector of bignums, but the numbers represented are small enough to be represented as 64-bit floats (which are considerably faster). The runtime may choose to convert this vector of bignums into a vector of floats, and pass it through the `float_cos` method instead. 

It doesn't switch the representation back to bignums, but instead `float_cos` returns another vector of floats, which gets passed to `float_exp`, and `float_sin`. Note that after each transformation, the immediately invoked operation doesn't have to be converted back into the substituted representation. 

	bignum_sin(bignum_exp(bignum_cos(n)))

Type conversions can be done lazily. A function which returns a given type doesn't actually have to return an object of that type, so long as it is something which can be casted into that type. 


### Degeneracy

But if we have multiple valid implementations, why should we only use one? Computers are generally really fast, and every function invocation is a real-world test case. When the equivalence invariants are broken, both the user can be notified, as well as the author of the disagreeing libraries. Outside of runtime, these uses can be saved along with the library as part of a repository of test cases.

With multiple implementations of the same method, they can automatically share test cases. This makes the robustness of the software ecosystem grow with respect to the number of packages, rather than shrinking with the rise of fragmentation[1]. 


Gerry Sussman uses a term borrowed from biology: degeneracy, to characterize a system which accomplishes something in different ways. In most package managers, most software ends up in a state of fragmentation— but this ability to reconcile behaviors means that we can turn a weakness into a strength. 

Anyone can pick an arbitrary implementation to build their app, and the one which is used will be whichever is the fastest available for the current platform. 


[1]: A few weeks ago I saw Vikash Mansingha's talk at the Media Lab, where he mentioned an interesting point that in many current data-analysis techniques, we have this strange paradox wherein adding more data (additional columns) increases the sparsity of our models, and makes it harder to find useful clusters. For a human analyst, adding more columns adds clarity, not confusion. Likewise it's strange that as we get more distinct implementations of something, the software ecosystem becomes more fragile. When intuitively, this really ought to make everything more robust and reliable.  

### Refactoring

When the choice of interface you describe in your code is arbitrary, we can automatically substitute one interface for another. But interfaces aren't just names, they can be entire sub-expressions. 

Lets say you need to calculate the nth triangle number for something you're building. The most readable way to write this is probably something like
	
	sum(1:n)

Where you're literally summing the numbers from 1 to n. But there's probably some module out there which has declared that in fact that kind of "interface" is equivalent to this analytic arithmetic solution

	n * (n + 1) / 2

But the same is true in reverse, if you have some complex bit of code, you can look into possible simplifications. 

Github's "scientist" library emphasizes this process of taking some bit of code and substituting a particular piece, running both the new adn the old to see if the results align. Their system is annoyingly explicit, when this kind of refactoring happens every day and all the time inline. This language could make it explicit, and moreover these substitutions can be shared so that others can leverage the increased clarity and speed. 


### Language

Perhaps it should take the form of a meta-language. A lightweight syntax which doesn't actually evaluate anything, but rather calls out to some set of other languages and runtimes to accomplish particular tasks. This is slightly distressing because it's going to be difficult to share data across different languages, but that might actually be a pretty simple problem to solve (i.e. x-format on y-language is only compatible if there's a x-string serialization and a deserializer for z-language). 

















