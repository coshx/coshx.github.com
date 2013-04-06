---
layout: post
title: Ruby's "and" and "or" operators explained
author: gabe
---
`||` and `&&` bind with the precedence that you expect from boolean operators in programming languages (`&&` is very strong, `||` is slightly less strong).

`and` and `or` have lower precedence.

For example, unlike `||`,  `or` has lower precedence than `=`:

{% highlight ruby %}
> a = false || true
 => true 
> a
 => true 
> a = false or true
 => true 
> a
 => false
{% endhighlight %}

</br>

Likewise, unlike `&&`, `and` also has lower precedence than `=`:

{% highlight ruby %}
> a = true && false
 => false 
> a
 => false 
> a = true and false
 => false 
> a
 => true 
{% endhighlight %}

</br>

What's more, unlike `&&` and `||`, `and` and `or` bind with equal precedence.

Notice that because `&&` is higher precedence than `||`, the 2nd and 3rd clause are bound together, so there's no need to evaluate either of them once the 1st clause evaluates true:

{% highlight ruby %}
> !puts(1) || !puts(2) && !puts(3)
1
 => true
{% endhighlight %}

</br>

But since `or` and `and` have equal precedence, the left-most `and` or `or` operator has higher precedence.  In this case the `or` is left-most so it binds the 1st and 2nd clauses together.  Because the second operator is an `and`, the 3rd clause must be evaluated to resolve the expression:

{% highlight ruby %}
> !puts(1) or !puts(2) and !puts(3)
1
3
 => true
{% endhighlight %}

</br>

Observe that the parentheses force the `and` to bind the 2nd and 3rd clauses together, just as if it were a `&&`: 
 
{% highlight ruby %}
> !puts(1) or (!puts(2) and !puts(3))
1
 => true
{% endhighlight %}

</br>

The weakly-binding `and` and `or` may be useful for control-flow purposes: see [Using "and" and "or" in Ruby](http://devblog.avdi.org/2010/08/02/using-and-and-or-in-ruby/).
