# Task

You are trying to create a small templating engine from scratch, and would like to parse the following template :

```txt
Hello {name}
```

In order to be able to call `render({name: "John"})`

in order to get as a result :

```txt
Hello John
```

You can test the software that was started, by running :

    node index.js input.txt

You should see that there is a bug.

**First task** : Please find the root cause of the bug and fix it.

**Second task** : A customer of yours writes you an email with following question, please reply to him.

> Dear Supplier,
>
> I hope you're having a great week !
> I have just tried your templating software and it works fine !
>
> I have a bunch of users who are using some other old and archaic software and the tags that my users are used to have is [[name]].
>
> Could you please add an option to your library to allow to parse those instead ?
>
> All the Best,
>
> John Giovanni
> Piazza Quaranta del Folia,
> 40137 , Rome
> phone: +3905414124
> www.comelia.com
> Please consider the environment before printing this email

**Third task** : Please make sure that it is also possible to have the same delimiter for the starting and ending of tags, ie be able to do %name%

Sometimes, your customers have some errors in their templates :

For example, following template where they forgot to close a tag :

```txt
Lorem ipsum dolor sit amet
Hello {name, what's up ?
```

and following template where they mistyped the closing tag.

```txt
{name} is {age{ year old today.
Lorem ipsum dolor sit amet
```

**Fourth task** : How would you change the software so that it will now highlight the errors ?

**Fifth task** : Add supports for loops :

```
{#users}
- {name}
{/}
```

with render({users: [{ name: "John"}, {name: "Mary"}]})

should output :

```
- John
- Mary
```
